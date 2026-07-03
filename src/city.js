// ── City layout & NPC spawn ───────────────────────────────────────────────────
//
// Cities sit on a jittered grid.  Every CITY_SPACING blocks there is ONE city.
// Inside each city, a 12-block-period grid lays out 2-block roads and 10-block
// building plots.  Buildings are hollow concrete+glass boxes; height scales with
// distance from the city center.

export const CITY_SPACING   = 600;  // blocks between city centres
export const CITY_RADIUS    = 220;  // blocks: city extent from centre
export const CITY_BASE_Y    = 24;   // terrain level inside cities
export const STREET_PERIOD  = 12;   // 2 road + 10 building per period
export const STREET_WIDTH   = 2;

function srng(seed) {
  let s = ((seed * 1664525 + 1013904223) >>> 0);
  return () => { s = ((s * 1664525 + 1013904223) >>> 0); return s / 0xffffffff; };
}

function mod(x, n) { return ((x % n) + n) % n; }

// ── Public: city info for a world column ──────────────────────────────────────
//
// Returns { centerX, centerZ, localX, localZ, dist, density, seed } or null.
export function getCityInfo(wx, wz, worldSeed) {
  const sp = CITY_SPACING;
  const gx = Math.floor(wx / sp);
  const gz = Math.floor(wz / sp);

  for (let dgx = -1; dgx <= 1; dgx++) {
    for (let dgz = -1; dgz <= 1; dgz++) {
      const cx2 = gx + dgx;
      const cz2 = gz + dgz;
      const r = srng(worldSeed * 31337 + cx2 * 92837 + cz2 * 18671);
      // Jitter city centre within the middle 60% of its grid cell
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
// Returns { type:'road' } or { type:'building', height, isPerimeter, isCorner }
export function getCityColumn(localX, localZ, density, citySeed) {
  // localX/localZ are floats (city centre is jitter-offset from integers).
  // Floor to integer block coords before modulo so strict-equality perimeter
  // checks (inX === 0, inX === 9, etc.) work correctly.
  const px = mod(Math.floor(localX), STREET_PERIOD);
  const pz = mod(Math.floor(localZ), STREET_PERIOD);

  if (px < STREET_WIDTH || pz < STREET_WIDTH) {
    // Sidewalk strip along roads
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
  const height    = floors * 3; // 3 blocks per storey

  return { type: 'building', height, floors, isPerimeter, isCorner, inX, inZ };
}

// ── Public: NPC spawn points for a chunk ─────────────────────────────────────
//
// cityInfoFn(wx, wz) must return the same getCityInfo result.
export function getChunkNPCSpawns(chunkX, chunkZ, worldSeed, cityInfoFn) {
  const SIZE = 16;
  const spawns = [];
  const seen   = new Set();

  // Sample 5 positions per chunk; only spawn at building entrance positions
  for (const [lx, lz] of [[3,3],[3,13],[13,3],[13,13],[8,8]]) {
    const wx = chunkX * SIZE + lx;
    const wz = chunkZ * SIZE + lz;
    const city = cityInfoFn(wx, wz);
    if (!city) continue;

    const col = getCityColumn(city.localX, city.localZ, city.density, city.seed);
    if (col.type !== 'building') continue;

    // Spawn on the perimeter, just outside the door opening (px=2 or pz=2)
    const px = mod(Math.floor(city.localX), STREET_PERIOD);
    const pz = mod(Math.floor(city.localZ), STREET_PERIOD);
    const isEntrance = (px === STREET_WIDTH && pz >= 4 && pz <= 7) ||
                       (pz === STREET_WIDTH && px >= 4 && px <= 7);
    if (!isEntrance) continue;

    const key = `${wx},${wz}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const r = srng(worldSeed + wx * 4999 + wz * 7691);
    const t = r();
    const type = t < 0.45 ? 'merchant' : t < 0.75 ? 'citizen' : 'builder';
    spawns.push({ wx: wx + 0.5, wy: CITY_BASE_Y + 1, wz: wz + 0.5, type,
                  seed: Math.floor(worldSeed + wx * 4999 + wz * 7691) });
  }
  return spawns;
}
