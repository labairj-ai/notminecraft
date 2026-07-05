// ── City layout, NPC spawn, and car spawn ─────────────────────────────────────
import * as B from './blocks.js';

export const CITY_SPACING   = 400;   // distance between village centres
export const CITY_RADIUS    = 80;    // small village footprint
export const CITY_BASE_Y    = 24;
export const STREET_PERIOD  = 26;    // 3 sidewalk + 6 road + 3 sidewalk + 14 building
export const ROAD_WIDTH     = 6;
export const SIDEWALK_WIDTH = 3;
export const STREET_WIDTH   = ROAD_WIDTH + SIDEWALK_WIDTH * 2; // 12
export const BUILDING_MAX   = STREET_PERIOD - STREET_WIDTH - 1; // 13

export const DOOR_WIDTH  = 2;
export const DOOR_START  = 6;
export const DOOR_HEIGHT = 3;

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

// ── Public: per-column layout ──────────────────────────────────────────────────
//
// Returns:
//   { type:'road', isSidewalk }
//   { type:'park', inX, inZ }
//   { type:'building', height, floors, isPerimeter, isCorner, isDoor, inX, inZ,
//     wallBlock, glassExterior, wallAxisX, buildingType }
export function getCityColumn(localX, localZ, density, citySeed) {
  const px = mod(Math.floor(localX), STREET_PERIOD);
  const pz = mod(Math.floor(localZ), STREET_PERIOD);

  if (px < STREET_WIDTH || pz < STREET_WIDTH) {
    const xSide = px < STREET_WIDTH && (px < SIDEWALK_WIDTH || px >= STREET_WIDTH - SIDEWALK_WIDTH);
    const zSide = pz < STREET_WIDTH && (pz < SIDEWALK_WIDTH || pz >= STREET_WIDTH - SIDEWALK_WIDTH);
    let isSidewalk;
    if (px < STREET_WIDTH && pz >= STREET_WIDTH) {
      isSidewalk = xSide;
    } else if (pz < STREET_WIDTH && px >= STREET_WIDTH) {
      isSidewalk = zSide;
    } else {
      isSidewalk = xSide && zSide;
    }
    return { type: 'road', isSidewalk };
  }

  const inX = px - STREET_WIDTH;
  const inZ = pz - STREET_WIDTH;
  const BM = BUILDING_MAX;
  const isPerimeter = inX === 0 || inX === BM || inZ === 0 || inZ === BM;
  const isCorner    = (inX === 0 || inX === BM) && (inZ === 0 || inZ === BM);

  const plotX = Math.floor(localX / STREET_PERIOD);
  const plotZ = Math.floor(localZ / STREET_PERIOD);
  const pr = srng(citySeed * 99991 + plotX * 73856 + plotZ * 19349);

  // 25% of plots are parks / open green space
  if (pr() < 0.25) {
    return { type: 'park', inX, inZ };
  }

  // Building type — weighted toward the everyday buildings
  const BUILDING_TYPES = [
    'residential', 'residential', 'residential',
    'commercial',  'commercial',
    'restaurant',  'restaurant',
    'police',
    'fire_station',
    'community_center',
  ];
  const buildingType = BUILDING_TYPES[Math.floor(pr() * BUILDING_TYPES.length)];

  // Small-town scale: 1–2 floors only
  const floors = 1 + Math.floor(pr() * 2);
  const height = floors * 3;

  // Door placement
  const doorWall = Math.floor(pr() * 4);
  let isDoor = false;
  if (isPerimeter && !isCorner) {
    const d0 = DOOR_START, d1 = DOOR_START + DOOR_WIDTH - 1;
    if (doorWall === 0 && inZ === 0  && inX >= d0 && inX <= d1) isDoor = true;
    if (doorWall === 1 && inX === BM && inZ >= d0 && inZ <= d1) isDoor = true;
    if (doorWall === 2 && inZ === BM && inX >= d0 && inX <= d1) isDoor = true;
    if (doorWall === 3 && inX === 0  && inZ >= d0 && inZ <= d1) isDoor = true;
  }

  // Wall material — themed per type; always consume one RNG value
  const wallRoll = pr();
  let wallBlock, glassExterior = false;
  switch (buildingType) {
    case 'police':          wallBlock = B.BRICK;        break;
    case 'fire_station':    wallBlock = B.COBBLESTONE;  break;
    case 'community_center': wallBlock = B.STONE;       break;
    default: {
      const WALL_MATS = [B.CONCRETE, B.BRICK, B.STONE, B.PLANKS, B.COBBLESTONE, B.GLASS];
      const si = Math.floor(wallRoll * WALL_MATS.length);
      wallBlock = WALL_MATS[si];
      glassExterior = si === 5;
    }
  }

  const wallAxisX = pr() > 0.5;

  return {
    type: 'building', height, floors, isPerimeter, isCorner, isDoor, inX, inZ,
    wallBlock, glassExterior, wallAxisX, buildingType,
  };
}

// ── Public: NPC spawn points for a chunk ─────────────────────────────────────
export function getChunkNPCSpawns(chunkX, chunkZ, worldSeed, cityInfoFn) {
  const SIZE = 16;
  const spawns = [];
  const seen   = new Set();

  // Pass 1: door-adjacent NPCs — type matched to building
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
    let type;
    switch (col.buildingType) {
      case 'police':       type = 'police';        break;
      case 'fire_station': type = 'builder';       break;
      case 'restaurant':   type = 'merchant';      break;
      default:
        type = t < 0.5 ? 'merchant' : t < 0.75 ? 'builder' : 'businessperson';
    }
    spawns.push({
      wx: wx + 0.5, wy: CITY_BASE_Y + 1, wz: wz + 0.5,
      type, wander: false,
      seed: Math.floor(worldSeed + wx * 4999 + wz * 7691),
    });
  }

  // Pass 2: street pedestrians
  const pr = srng(worldSeed * 7 + chunkX * 9431 + chunkZ * 6271);
  const count = Math.floor(pr() * 3);
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
    const type =
      t < 0.05 ? 'spider_hero' :
      t < 0.09 ? 'shadow_knight' :
      t < 0.12 ? 'kid_hero' :
      t < 0.14 ? 'brute' :
      t < 0.16 ? 'scrap_knight' :
      t < 0.46 ? 'citizen' :
      t < 0.66 ? 'police' :
      t < 0.84 ? 'businessperson' : 'tourist';
    spawns.push({
      wx: wx + 0.5, wy: CITY_BASE_Y + 1, wz: wz + 0.5,
      type, wander: true,
      seed: Math.floor(worldSeed + wx * 3571 + wz * 8219 + i),
    });
  }

  return spawns;
}

const CAR_TYPES = ['car','car','car','car','truck','truck','monster_truck','limo','motorcycle','motorcycle','bus','dog_car'];
const CAR_GROUND_CLEARANCES = { car:0.26, truck:0.32, monster_truck:0.78, limo:0.28, motorcycle:0.34, bus:0.36, dog_car:0.26 };

// ── Public: car spawn points for a chunk ─────────────────────────────────────
export function getChunkCarSpawns(chunkX, chunkZ, worldSeed, cityInfoFn) {
  const SIZE = 16;
  const spawns = [];
  const seen   = new Set();

  const pr = srng(worldSeed * 13 + chunkX * 6571 + chunkZ * 8831);
  const count = Math.floor(pr() * 2.5);

  for (let i = 0; i < count; i++) {
    const lx = Math.floor(pr() * SIZE);
    const lz = Math.floor(pr() * SIZE);
    const wx = chunkX * SIZE + lx;
    const wz = chunkZ * SIZE + lz;
    const city = cityInfoFn(wx, wz);
    if (!city) continue;

    const col = getCityColumn(city.localX, city.localZ, city.density, city.seed);
    if (col.type !== 'road' || col.isSidewalk) continue;

    const key = `car:${wx},${wz}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const ippx = mod(Math.floor(city.localX), STREET_PERIOD);
    const ippz = mod(Math.floor(city.localZ), STREET_PERIOD);
    let heading;
    if (ippx < STREET_WIDTH && ippz >= STREET_WIDTH) {
      heading = pr() < 0.5 ? 0 : Math.PI;
    } else if (ippz < STREET_WIDTH && ippx >= STREET_WIDTH) {
      heading = pr() < 0.5 ? Math.PI / 2 : -Math.PI / 2;
    } else {
      heading = Math.floor(pr() * 4) * Math.PI / 2;
    }

    const vt = CAR_TYPES[Math.floor(pr() * CAR_TYPES.length)];
    spawns.push({
      wx: wx + 0.5,
      wy: CITY_BASE_Y + 1 + (CAR_GROUND_CLEARANCES[vt] ?? 0.26),
      wz: wz + 0.5,
      heading,
      seed: Math.floor(worldSeed + wx * 5003 + wz * 7411 + i),
      vehicleType: vt,
    });
  }

  return spawns;
}

// ── Public: bus stop spawn points for a chunk ────────────────────────────────
export function getChunkBusStopSpawns(chunkX, chunkZ, worldSeed, cityInfoFn) {
  const SIZE = 16;
  const spawns = [];
  const seen   = new Set();

  for (let lx = 0; lx < SIZE; lx++) {
    for (let lz = 0; lz < SIZE; lz++) {
      const wx = chunkX * SIZE + lx;
      const wz = chunkZ * SIZE + lz;
      const city = cityInfoFn(wx, wz);
      if (!city) continue;

      const px = mod(Math.floor(city.localX), STREET_PERIOD);
      const pz = mod(Math.floor(city.localZ), STREET_PERIOD);

      // Must be in a Z-corridor outer sidewalk: px < STREET_WIDTH, pz >= STREET_WIDTH, px === 1
      if (!(px < STREET_WIDTH && pz >= STREET_WIDTH && px === 1)) continue;
      // Middle of building-facing plot row
      if ((pz - STREET_WIDTH) !== 7) continue;
      // Every other plot
      if (Math.floor(city.localZ / STREET_PERIOD) % 2 !== 0) continue;

      const key = `bs:${wx},${wz}`;
      if (seen.has(key)) continue;
      seen.add(key);

      spawns.push({ wx: wx + 0.5, wz: wz + 0.5, cityX: city.centerX, cityZ: city.centerZ });
    }
  }

  return spawns;
}

// ── Public: shopkeeper spawn points for a chunk ───────────────────────────────
export function getChunkShopkeeperSpawns(chunkX, chunkZ, worldSeed, cityInfoFn) {
  const SIZE = 16;
  const spawns = [];
  const seen   = new Set();

  for (let lx = 0; lx < SIZE; lx++) {
    for (let lz = 0; lz < SIZE; lz++) {
      const wx = chunkX * SIZE + lx;
      const wz = chunkZ * SIZE + lz;
      const city = cityInfoFn(wx, wz);
      if (!city) continue;

      const col = getCityColumn(city.localX, city.localZ, city.density, city.seed);
      if (col.type !== 'building' || col.isPerimeter) continue;

      if (col.inX !== 6 || col.inZ !== 4) continue;

      const key = `shop:${wx},${wz}`;
      if (seen.has(key)) continue;
      seen.add(key);

      let role;
      switch (col.buildingType) {
        case 'commercial':      role = 'shopkeeper';    break;
        case 'restaurant':      role = 'chef';          break;
        case 'police':          role = 'police';        break;
        case 'fire_station':    role = 'builder';       break;
        case 'community_center': role = 'researcher';  break;
        case 'residential':     role = 'researcher';   break;
        default:                role = 'shopkeeper';    break;
      }

      spawns.push({
        wx: wx + 0.5,
        wy: CITY_BASE_Y + 1,
        wz: wz + 0.5,
        type: 'shopkeeper',
        role,
        wander: false,
        seed: Math.floor(worldSeed + wx * 5113 + wz * 7919),
      });
    }
  }

  return spawns;
}
