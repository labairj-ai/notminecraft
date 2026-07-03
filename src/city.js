// ── City layout & NPC spawn ───────────────────────────────────────────────────

export const CITY_SPACING   = 600;
export const CITY_RADIUS    = 220;
export const CITY_BASE_Y    = 24;
export const STREET_PERIOD  = 12;   // 2 road + 10 building per period
export const STREET_WIDTH   = 2;

// Door opening: 2 blocks wide, centred in wall, 2 blocks tall (relY 1–2)
export const DOOR_WIDTH    = 2;
export const DOOR_START    = 4;    // inX/inZ position of door left edge (in 10-wide wall)
export const DOOR_HEIGHT   = 3;    // air from relY=1 to relY=3 (3 blocks tall)

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
//   { type:'road', sidewalk:bool }
//   { type:'building', height, floors, isPerimeter, isCorner, isDoor, inX, inZ }
export function getCityColumn(localX, localZ, density, citySeed) {
  // Floor to integer block coords — localX/localZ are floats due to jitter.
  const px = mod(Math.floor(localX), STREET_PERIOD);
  const pz = mod(Math.floor(localZ), STREET_PERIOD);

  if (px < STREET_WIDTH || pz < STREET_WIDTH) {
    const isSidewalk = (px === STREET_WIDTH || px === STREET_WIDTH + 1 ||
                        pz === STREET_WIDTH || pz === STREET_WIDTH + 1);
    return { type: 'road', sidewalk: isSidewalk };
  }

  const inX = px - STREET_WIDTH; // 0–9
  const inZ = pz - STREET_WIDTH; // 0–9
  const isPerimeter = inX === 0 || inX === 9 || inZ === 0 || inZ === 9;
  const isCorner    = (inX === 0 || inX === 9) && (inZ === 0 || inZ === 9);

  const plotX = Math.floor(localX / STREET_PERIOD);
  const plotZ = Math.floor(localZ / STREET_PERIOD);
  const pr = srng(citySeed * 99991 + plotX * 73856 + plotZ * 19349);
  const minFloors = Math.max(1, Math.round(density * 8));
  const floors    = minFloors + Math.floor(pr() * 6);
  const height    = floors * 3;

  // Each building gets one door: a randomly chosen wall, centred.
  // doorWall: 0=inZ=0(front), 1=inX=9(right), 2=inZ=9(back), 3=inX=0(left)
  const doorWall = Math.floor(pr() * 4);
  let isDoor = false;
  if (isPerimeter && !isCorner) {
    const d0 = DOOR_START;
    const d1 = DOOR_START + DOOR_WIDTH - 1;
    if (doorWall === 0 && inZ === 0 && inX >= d0 && inX <= d1) isDoor = true;
    if (doorWall === 1 && inX === 9 && inZ >= d0 && inZ <= d1) isDoor = true;
    if (doorWall === 2 && inZ === 9 && inX >= d0 && inX <= d1) isDoor = true;
    if (doorWall === 3 && inX === 0 && inZ >= d0 && inZ <= d1) isDoor = true;
  }

  return { type: 'building', height, floors, isPerimeter, isCorner, isDoor, inX, inZ };
}

// ── Public: NPC spawn points for a chunk ─────────────────────────────────────
export function getChunkNPCSpawns(chunkX, chunkZ, worldSeed, cityInfoFn) {
  const SIZE = 16;
  const spawns = [];
  const seen   = new Set();

  // ── Pass 1: door-adjacent NPCs (merchants, builders) ─────────────────────
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

  // ── Pass 2: street pedestrians (citizens, police, tourists) ──────────────
  const pr = srng(worldSeed * 7 + chunkX * 9431 + chunkZ * 6271);
  const count = Math.floor(pr() * 3); // 0–2 pedestrians per chunk
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
