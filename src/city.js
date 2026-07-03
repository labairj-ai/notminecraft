// ── City layout, NPC spawn, and car spawn ─────────────────────────────────────
import * as B from './blocks.js';

export const CITY_SPACING   = 600;
export const CITY_RADIUS    = 220;
export const CITY_BASE_Y    = 24;
export const STREET_PERIOD  = 20;   // 6 road + 14 building per period (wide roads for cars)
export const STREET_WIDTH   = 6;
export const BUILDING_MAX   = STREET_PERIOD - STREET_WIDTH - 1; // 13 (far perimeter edge)

export const DOOR_WIDTH     = 2;    // 2-block-wide door opening
export const DOOR_START     = 6;    // left edge of door in 0–13 wall (centred)
export const DOOR_HEIGHT    = 3;    // air from relY=1 to relY=3 (3 blocks tall)

function srng(seed) {
  let s = ((seed * 1664525 + 1013904223) >>> 0);
  return () => { s = ((s * 1664525 + 1013904223) >>> 0); return s / 0xffffffff; };
}

function mod(x, n) { return ((x % n) + n) % n; }

// ── Public: city info for a world column ──────────────────────────────────────
export function getCityInfo(wx, wz, worldSeed) {
  const sp = CITY_SPACING;
  const gx = Math.floor(wx / sp);
  const gz = Math.floor(wz / sp);

  for (let dgx = -1; dgx <= 1; dgx++) {
    for (let dgz = -1; dgz <= 1; dgz++) {
      const cx2 = gx + dgx;
      const cz2 = gz + dgz;
      const r = srng(worldSeed * 31337 + cx2 * 92837 + cz2 * 18671);
      const cx = (cx2 + 0.2 + r() * 0.6) * sp;
      const cz = (cz2 + 0.2 + r() * 0.6) * sp;
      const lx = wx - cx;
      const lz = wz - cz;
      const dist = Math.sqrt(lx * lx + lz * lz);
      if (dist < CITY_RADIUS) {
        return {
          centerX: cx, centerZ: cz,
          localX: lx, localZ: lz,
          dist,
          density: 1 - dist / CITY_RADIUS,
          seed: cx2 * 92837 + cz2 * 18671 + worldSeed,
        };
      }
    }
  }
  return null;
}

// ── Public: per-column layout ─────────────────────────────────────────────────
//
// Returns:
//   { type:'road' }
//   { type:'building', height, floors, isPerimeter, isCorner, isDoor, inX, inZ }
export function getCityColumn(localX, localZ, density, citySeed) {
  // Floor to integer block coords — localX/localZ are floats due to jitter.
  const px = mod(Math.floor(localX), STREET_PERIOD);
  const pz = mod(Math.floor(localZ), STREET_PERIOD);

  if (px < STREET_WIDTH || pz < STREET_WIDTH) {
    return { type: 'road' };
  }

  const inX = px - STREET_WIDTH; // 0–BUILDING_MAX
  const inZ = pz - STREET_WIDTH;
  const BM = BUILDING_MAX;
  const isPerimeter = inX === 0 || inX === BM || inZ === 0 || inZ === BM;
  const isCorner    = (inX === 0 || inX === BM) && (inZ === 0 || inZ === BM);

  const plotX = Math.floor(localX / STREET_PERIOD);
  const plotZ = Math.floor(localZ / STREET_PERIOD);
  const pr = srng(citySeed * 99991 + plotX * 73856 + plotZ * 19349);
  const minFloors = Math.max(1, Math.round(density * 8));
  const floors    = minFloors + Math.floor(pr() * 6);
  const height    = floors * 3;

  // One door per building face: doorWall 0=front(inZ=0), 1=right(inX=BM), 2=back(inZ=BM), 3=left(inX=0)
  const doorWall = Math.floor(pr() * 4);
  let isDoor = false;
  if (isPerimeter && !isCorner) {
    const d0 = DOOR_START;
    const d1 = DOOR_START + DOOR_WIDTH - 1;
    if (doorWall === 0 && inZ === 0  && inX >= d0 && inX <= d1) isDoor = true;
    if (doorWall === 1 && inX === BM && inZ >= d0 && inZ <= d1) isDoor = true;
    if (doorWall === 2 && inZ === BM && inX >= d0 && inX <= d1) isDoor = true;
    if (doorWall === 3 && inX === 0  && inZ >= d0 && inZ <= d1) isDoor = true;
  }

  // ── Building style (exterior material + interior layout) ─────────────────────
  const WALL_MATERIALS = [
    B.CONCRETE, B.BRICK, B.STONE, B.PLANKS,
    B.COBBLESTONE, B.GLASS, B.SAND, B.MOSSY_COBBLE,
  ];
  const styleIdx     = Math.floor(pr() * WALL_MATERIALS.length);
  const wallBlock    = WALL_MATERIALS[styleIdx];
  const glassExterior = (styleIdx === 5); // all-glass tower
  const wallAxisX    = pr() > 0.5;        // interior partition direction (X or Z axis)

  return {
    type: 'building', height, floors, isPerimeter, isCorner, isDoor, inX, inZ,
    wallBlock, glassExterior, wallAxisX,
  };
}

// ── Public: NPC spawn points for a chunk ─────────────────────────────────────
export function getChunkNPCSpawns(chunkX, chunkZ, worldSeed, cityInfoFn) {
  const SIZE = 16;
  const spawns = [];
  const seen   = new Set();

  // Pass 1: door-adjacent NPCs (merchants, builders, businesspeople)
  for (const [lx, lz] of [[2,2],[2,10],[10,2],[10,10],[6,6],[6,2],[2,6],[10,6],[6,10]]) {
    const wx = chunkX * SIZE + lx;
    const wz = chunkZ * SIZE + lz;
    const city = cityInfoFn(wx, wz);
    if (!city) continue;

    const col = getCityColumn(city.localX, city.localZ, city.density, city.seed);
    if (col.type !== 'building' || !col.isDoor) continue;

    const key = `${wx},${wz}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const r = srng(worldSeed + wx * 4999 + wz * 7691);
    const t = r();
    const type = t < 0.5 ? 'merchant' : t < 0.75 ? 'builder' : 'businessperson';
    spawns.push({
      wx: wx + 0.5, wy: CITY_BASE_Y + 1, wz: wz + 0.5,
      type, wander: false,
      seed: Math.floor(worldSeed + wx * 4999 + wz * 7691),
    });
  }

  // Pass 2: street pedestrians (citizens, police, tourists)
  const pr = srng(worldSeed * 7 + chunkX * 9431 + chunkZ * 6271);
  const count = Math.floor(pr() * 3); // 0–2 per chunk
  for (let i = 0; i < count; i++) {
    const lx = Math.floor(pr() * SIZE);
    const lz = Math.floor(pr() * SIZE);
    const wx = chunkX * SIZE + lx;
    const wz = chunkZ * SIZE + lz;
    const city = cityInfoFn(wx, wz);
    if (!city) continue;

    const col = getCityColumn(city.localX, city.localZ, city.density, city.seed);
    if (col.type !== 'road') continue;

    const key = `ped:${wx},${wz}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const r2 = srng(worldSeed + wx * 3571 + wz * 8219 + i);
    const t = r2();
    const type = t < 0.35 ? 'citizen' : t < 0.6 ? 'police' : t < 0.85 ? 'businessperson' : 'tourist';
    spawns.push({
      wx: wx + 0.5, wy: CITY_BASE_Y + 1, wz: wz + 0.5,
      type, wander: true,
      seed: Math.floor(worldSeed + wx * 3571 + wz * 8219 + i),
    });
  }

  return spawns;
}

// ── Public: car spawn points for a chunk ─────────────────────────────────────
export function getChunkCarSpawns(chunkX, chunkZ, worldSeed, cityInfoFn) {
  const SIZE = 16;
  const spawns = [];
  const seen   = new Set();

  const pr = srng(worldSeed * 13 + chunkX * 6571 + chunkZ * 8831);
  const count = Math.floor(pr() * 2.5); // 0–2 cars per chunk

  for (let i = 0; i < count; i++) {
    const lx = Math.floor(pr() * SIZE);
    const lz = Math.floor(pr() * SIZE);
    const wx = chunkX * SIZE + lx;
    const wz = chunkZ * SIZE + lz;
    const city = cityInfoFn(wx, wz);
    if (!city) continue;

    const col = getCityColumn(city.localX, city.localZ, city.density, city.seed);
    if (col.type !== 'road') continue;

    const key = `car:${wx},${wz}`;
    if (seen.has(key)) continue;
    seen.add(key);

    // Road orientation → car heading
    const ippx = mod(Math.floor(city.localX), STREET_PERIOD);
    const ippz = mod(Math.floor(city.localZ), STREET_PERIOD);
    let heading;
    if (ippx < STREET_WIDTH && ippz >= STREET_WIDTH) {
      heading = pr() < 0.5 ? 0 : Math.PI;          // Z-aligned road
    } else if (ippz < STREET_WIDTH && ippx >= STREET_WIDTH) {
      heading = pr() < 0.5 ? Math.PI / 2 : -Math.PI / 2; // X-aligned road
    } else {
      heading = Math.floor(pr() * 4) * Math.PI / 2; // intersection
    }

    spawns.push({
      wx: wx + 0.5,
      wy: CITY_BASE_Y + 1.26,  // just above road surface (ASPHALT top face = y=25)
      wz: wz + 0.5,
      heading,
      seed: Math.floor(worldSeed + wx * 5003 + wz * 7411 + i),
    });
  }

  return spawns;
}
