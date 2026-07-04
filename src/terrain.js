import * as B from './blocks.js';
import { getCityInfo, getCityColumn, CITY_BASE_Y, DOOR_HEIGHT } from './city.js';

// Returns the block to place at a given interior cell above the floor slab.
// inX/inZ: 1-12 (interior coords within building), floorNum: 0=ground, 1+
// blockInFlr: 1 or 2 (position within the 3-block floor period, 0=slab itself)
function interiorBlock(inX, inZ, floorNum, blockInFlr, wallAxisX) {
  // Partition wall divides building into two rooms (with a 3-block passage at centre)
  const isPartCol  = wallAxisX ? (inX === 7) : (inZ === 7);
  const inPassage  = wallAxisX ? (inZ >= 5 && inZ <= 7) : (inX >= 5 && inX <= 7);
  if (isPartCol && !inPassage) return B.PLANKS;

  // Furniture only at the first block above the floor slab
  if (blockInFlr !== 1) return B.AIR;

  // Corner items pushed against interior walls
  if (inX === 1  && inZ === 1)  return B.CHEST;
  if (inX === 12 && inZ === 12) return B.CHEST;
  if (inX === 1  && inZ === 12) return B.BOOKSHELF;
  if (inX === 12 && inZ === 1)  return B.BOOKSHELF;

  // Ground floor utility blocks
  if (floorNum === 0 && inX === 4 && inZ === 4) return B.CRAFTING;
  if (floorNum === 0 && inX === 9 && inZ === 4) return B.FURNACE;

  // Upper floor beds (residential rooms)
  if (floorNum > 0 && inX === 4 && inZ === 10) return B.BED;
  if (floorNum > 0 && inX === 9 && inZ === 10) return B.BED;

  return B.AIR;
}

export const CHUNK_SIZE   = 16;
export const CHUNK_HEIGHT = 64;
export const SEA_LEVEL    = 22;

export function blockIndex(x, y, z) {
  return x + z * CHUNK_SIZE + y * CHUNK_SIZE * CHUNK_SIZE;
}

function lerp(a, b, t) { return a + (b - a) * t; }
function smoothstep(t) { return t * t * (3 - 2 * t); }

export function generateChunkData(chunkX, chunkZ, noise2D, noise3D, worldSeed = 0) {
  const data = new Uint8Array(CHUNK_SIZE * CHUNK_SIZE * CHUNK_HEIGHT);
  const treePositions = [];

  for (let lx = 0; lx < CHUNK_SIZE; lx++) {
    for (let lz = 0; lz < CHUNK_SIZE; lz++) {
      const wx = chunkX * CHUNK_SIZE + lx;
      const wz = chunkZ * CHUNK_SIZE + lz;

      // ── City override ──────────────────────────────────────────────────────
      const city = getCityInfo(wx, wz, worldSeed);
      if (city) {
        const col   = getCityColumn(city.localX, city.localZ, city.density, city.seed);
        const baseY = CITY_BASE_Y;
        for (let y = 0; y < CHUNK_HEIGHT; y++) {
          const idx = blockIndex(lx, y, lz);
          if (y === 0)          { data[idx] = B.BEDROCK;  continue; }
          if (y < baseY - 3)    { data[idx] = B.STONE;    continue; }
          if (y < baseY)        { data[idx] = B.DIRT;     continue; }

          if (col.type === 'road') {
            if (col.isSidewalk) {
              data[idx] = (y === baseY) ? B.SIDEWALK : B.AIR;
            } else {
              data[idx] = (y === baseY) ? B.ASPHALT : B.AIR;
            }
            continue;
          }

          // Building column
          const bh  = col.height;
          const relY = y - baseY;
          if (y === baseY) {
            data[idx] = B.CONCRETE; // ground slab (all columns)
          } else if (y <= baseY + bh) {
            if (col.isPerimeter) {
              // ── Exterior walls ──────────────────────────────────────────
              if (col.isDoor && relY >= 1 && relY <= 2) {
                data[idx] = B.DOOR_CLOSED;
              } else if (col.isDoor && relY >= 3 && relY <= DOOR_HEIGHT) {
                data[idx] = B.AIR; // top clearance
              } else if (col.glassExterior) {
                data[idx] = B.GLASS; // all-glass tower
              } else {
                const isWindow = !col.isCorner && (relY % 3 === 2) && relY < bh;
                data[idx] = isWindow ? B.GLASS : col.wallBlock;
              }
            } else {
              // ── Interior ────────────────────────────────────────────────
              const blockInFlr = relY % 3;
              if (blockInFlr === 0) {
                data[idx] = B.PLANKS; // floor slab at every level
              } else {
                const floorNum = Math.floor(relY / 3);
                data[idx] = interiorBlock(col.inX, col.inZ, floorNum, blockInFlr, col.wallAxisX);
              }
            }
          } else if (y === baseY + bh + 1) {
            data[idx] = B.CONCRETE; // flat roof
          } else {
            data[idx] = B.AIR;
          }
        }
        continue; // skip natural generation + tree placement for this column
      }

      // ── Natural terrain ────────────────────────────────────────────────────
      // Biome (temperature, humidity)
      const temp     = noise2D(wx * 0.0025, wz * 0.0025);
      const humidity = noise2D(wx * 0.0025 + 200, wz * 0.0025 + 200);

      const isDesert = temp > 0.35 && humidity < 0.0;
      const isSnowy  = temp < -0.35;
      const isForest = humidity > 0.2 && !isDesert;

      // Terrain height — continental + mountain layers
      const continent = noise2D(wx * 0.006, wz * 0.006);
      const hill      = noise2D(wx * 0.02,  wz * 0.02) * 0.5;
      const detail    = noise2D(wx * 0.06,  wz * 0.06) * 0.25;
      const mountain  = Math.max(0, noise2D(wx * 0.004 + 50, wz * 0.004 + 50));

      const raw = continent + hill + detail + mountain * 0.8;
      const height = Math.floor(SEA_LEVEL + raw * 20);
      const surfY  = Math.max(1, Math.min(CHUNK_HEIGHT - 4, height));

      // Cave carving
      const caveCarve = (y) => {
        const c = noise3D(wx * 0.05, y * 0.05, wz * 0.05);
        return c > 0.55;
      };

      for (let y = 0; y < CHUNK_HEIGHT; y++) {
        const idx = blockIndex(lx, y, lz);
        const isUnderground = y < surfY - 4;
        const isSurface     = y === surfY;
        const isSubsurface  = y >= surfY - 4 && y < surfY;
        const belowSea      = surfY <= SEA_LEVEL;

        if (y === 0) {
          data[idx] = B.BEDROCK;
          continue;
        }

        if (isUnderground) {
          if (caveCarve(y)) { data[idx] = B.AIR; continue; }
          // Ore distribution
          const oreNoise = noise3D(wx * 0.12 + 10, y * 0.12 + 10, wz * 0.12 + 10);
          if (y <= 10 && oreNoise > 0.82) { data[idx] = B.DIAMOND_ORE; }
          else if (y <= 20 && oreNoise > 0.78) { data[idx] = B.GOLD_ORE; }
          else if (oreNoise > 0.72) { data[idx] = B.IRON_ORE; }
          else if (oreNoise > 0.62) { data[idx] = B.COAL_ORE; }
          else data[idx] = B.STONE;
          continue;
        }

        if (isSubsurface) {
          data[idx] = isDesert ? B.SAND : B.DIRT;
          continue;
        }

        if (isSurface) {
          if (belowSea && !isDesert) {
            // River/lake beds: clay patches amid sand
            const clayN = noise2D(wx * 0.05 + 777, wz * 0.05 + 777);
            data[idx] = (clayN > 0.2) ? B.CLAY : B.SAND;
          } else if (belowSea || isDesert) { data[idx] = B.SAND; }
          else if (isSnowy)  { data[idx] = B.SNOW_BLOCK; }
          else               { data[idx] = B.GRASS; }
          continue;
        }

        // Above surface
        if (y <= SEA_LEVEL && y > surfY) {
          data[idx] = B.WATER;
          continue;
        }

        data[idx] = B.AIR;
      }

      // Tree placement (forest + non-desert, above sea)
      if (!isDesert && surfY > SEA_LEVEL + 1 && surfY < CHUNK_HEIGHT - 10) {
        const treeNoise = noise2D(wx * 0.28 + 500, wz * 0.28 + 500);
        const density   = isForest ? 0.65 : 0.72;
        if (treeNoise > density) {
          treePositions.push({ lx, lz, surfY, snowy: isSnowy });
        }
      }

      // Wool patches (small grassy tufts, ~2% chance on non-desert grass above sea)
      if (!isDesert && !isSnowy && surfY > SEA_LEVEL && surfY < CHUNK_HEIGHT - 2) {
        const woolNoise = noise2D(wx * 0.7 + 900, wz * 0.7 + 900);
        if (woolNoise > 0.92) {
          data[blockIndex(lx, surfY + 1, lz)] = B.WOOL;
        }
      }
    }
  }

  // Plant trees
  for (const { lx, lz, surfY, snowy } of treePositions) {
    const trunkH = 4 + Math.floor(Math.abs(noise2D(
      (chunkX*16+lx)*0.5+999, (chunkZ*16+lz)*0.5+999
    )) * 3);
    const topY = surfY + trunkH;

    // Trunk
    for (let y = surfY + 1; y <= topY; y++) {
      if (y >= CHUNK_HEIGHT) break;
      data[blockIndex(lx, y, lz)] = B.WOOD;
    }

    // Leaves (3-wide sphere around top)
    const leafR = 2;
    for (let dx = -leafR; dx <= leafR; dx++) {
      for (let dy = -leafR; dy <= leafR + 1; dy++) {
        for (let dz = -leafR; dz <= leafR; dz++) {
          if (dx*dx + dy*dy + dz*dz > (leafR+0.5)*(leafR+0.5)) continue;
          const lxl = lx + dx;
          const ly  = topY + dy;
          const lzl = lz + dz;
          if (lxl < 0 || lxl >= CHUNK_SIZE || lzl < 0 || lzl >= CHUNK_SIZE) continue;
          if (ly <= 0 || ly >= CHUNK_HEIGHT) continue;
          const lidx = blockIndex(lxl, ly, lzl);
          if (data[lidx] === B.AIR) data[lidx] = B.LEAVES;
        }
      }
    }
  }

  return data;
}
