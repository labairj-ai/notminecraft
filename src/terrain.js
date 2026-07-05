import * as B from './blocks.js';
import { getCityInfo, getCityColumn, CITY_BASE_Y, DOOR_HEIGHT, BUILDING_MAX } from './city.js';

// Returns the block to place at a given interior cell above the floor slab.
// inX/inZ: 1-12, floorNum: 0=ground, 1+
// blockInFlr: 1 or 2 (0=slab handled separately)
function interiorBlock(inX, inZ, floorNum, blockInFlr, wallAxisX, buildingType) {
  // Escalator column — shaft air; floor tiles placed at blockInFlr=0 level
  if (inX === 2 && inZ === 2) return B.AIR;
  // Step-off shaft — kept clear so players can drop down
  if (inX === 3 && inZ === 2) return B.AIR;

  // Partition wall divides building into two rooms (open-plan types skip it)
  const isPartCol = wallAxisX ? (inX === 7) : (inZ === 7);
  // Passage through the wall + gaps at both perimeter edges so the door is never blocked from inside
  const inPassage = wallAxisX
    ? (inZ >= 5 && inZ <= 7) || inZ <= 1 || inZ >= BUILDING_MAX - 1
    : (inX >= 5 && inX <= 7) || inX <= 1 || inX >= BUILDING_MAX - 1;
  if (isPartCol && !inPassage && buildingType !== 'fire_station') return B.PLANKS;

  // Only place furniture at blockInFlr === 1 (just above floor slab)
  if (blockInFlr !== 1) return B.AIR;

  // Shared corner anchors
  if (inX === 1  && inZ === 1)  return B.CHEST;
  if (inX === 12 && inZ === 12) return B.CHEST;

  switch (buildingType) {

    case 'residential':
      if (inX === 1  && inZ === 12) return B.BOOKSHELF;
      if (inX === 12 && inZ === 1)  return B.BOOKSHELF;
      if (floorNum === 0 && inX === 4 && inZ === 4) return B.COUNTER;
      if (floorNum === 0 && inX === 9 && inZ === 4) return B.FURNACE;
      if (floorNum === 0 && inX === 6 && inZ === 8) return B.TABLE;
      if (floorNum === 0 && inX === 5 && inZ === 8) return B.CHAIR;
      if (floorNum === 0 && inX === 7 && inZ === 8) return B.CHAIR;
      if (floorNum === 0 && inX === 3 && inZ === 2) return B.LAMP;
      if (floorNum > 0  && inX === 4 && inZ === 10) return B.BED;
      if (floorNum > 0  && inX === 9 && inZ === 10) return B.BED;
      if (floorNum > 0  && inX === 4 && inZ === 3)  return B.DESK;
      if (floorNum > 0  && inX === 3 && inZ === 2)  return B.LAMP;
      return B.AIR;

    case 'restaurant':
      if (inX === 1  && inZ === 12) return B.FURNACE;
      if (inX === 12 && inZ === 1)  return B.CRAFTING;
      // Counter bar along back wall (inZ=1..3)
      if (inZ <= 3 && inX >= 2 && inX <= 11) return B.COUNTER;
      // Stools at bar
      if (inZ === 4 && inX >= 2 && inX <= 11 && inX % 2 === 0) return B.STOOL;
      // Dining tables (groups of 2)
      if (inZ >= 6 && inZ <= 10 && inX >= 2 && inX <= 11) {
        if ((inX % 3 === 0) && (inZ % 3 === 0)) return B.TABLE;
        if ((inX % 3 === 1) && (inZ % 3 === 0)) return B.CHAIR;
        if ((inX % 3 === 2) && (inZ % 3 === 0)) return B.CHAIR;
      }
      if (inX === 11 && inZ === 12) return B.LAMP;
      if (inX === 2  && inZ === 12) return B.LAMP;
      return B.AIR;

    case 'office':
      if (inX === 1  && inZ === 12) return B.BOOKSHELF;
      if (inX === 12 && inZ === 1)  return B.BOOKSHELF;
      // Desk rows
      if (inZ >= 2 && inZ <= 10 && inZ % 3 === 2 && inX >= 2 && inX <= 11) return B.DESK;
      if (inZ >= 2 && inZ <= 10 && inZ % 3 === 0 && inX >= 2 && inX <= 11 && inX % 2 === 0) return B.CHAIR;
      // Filing cabinets along side wall
      if (inX === 2 && inZ >= 2 && inZ <= 10 && inZ % 4 === 2) return B.FILING_CABINET;
      // TV on one wall (ground floor)
      if (floorNum === 0 && inX === 11 && inZ === 12) return B.TV;
      if (inX === 11 && inZ === 2) return B.LAMP;
      if (inX === 2  && inZ === 11) return B.LAMP;
      return B.AIR;

    case 'commercial':
    default:
      if (inX === 1  && inZ === 12) return B.BOOKSHELF;
      if (inX === 12 && inZ === 1)  return B.CRAFTING;
      if (inZ <= 3 && inX >= 2 && inX <= 11) return B.COUNTER;
      if (inZ >= 5 && inZ <= 9 && inX >= 3 && inX <= 10 && inX % 4 === 3 && inZ % 4 === 1) return B.CHEST;
      if (inX === 3 && inZ === 11) return B.LAMP;
      return B.AIR;

    case 'police':
      // Front reception counter
      if (inZ <= 3 && inX >= 2 && inX <= 11) return B.COUNTER;
      // Officer desks and chairs
      if (inZ >= 5 && inZ <= 9 && inX % 3 === 2 && inX >= 2 && inX <= 11) return B.DESK;
      if (inZ >= 5 && inZ <= 9 && inX % 3 === 0 && inX >= 2 && inX <= 11) return B.CHAIR;
      // Filing cabinets and monitor along side wall
      if (inX === 11 && inZ >= 5 && inZ <= 9 && inZ % 2 === 1) return B.FILING_CABINET;
      if (inX === 11 && inZ === 4) return B.TV;
      if (inX === 4  && inZ === 11) return B.LAMP;
      if (inX === 9  && inZ === 11) return B.LAMP;
      return B.AIR;

    case 'fire_station':
      // Open vehicle bay (centre columns stay clear)
      if (inX >= 4 && inX <= 9) return B.AIR;
      // Equipment counters along side walls
      if (inZ >= 2 && inZ <= 8) return B.COUNTER;
      // Back desk
      if (inZ >= 10 && inX >= 5 && inX <= 8) return B.DESK;
      if (inX === 2  && inZ === 10) return B.LAMP;
      if (inX === 11 && inZ === 10) return B.LAMP;
      return B.AIR;

    case 'community_center':
      if (inX === 1  && inZ === 12) return B.BOOKSHELF;
      if (inX === 12 && inZ === 12) return B.BOOKSHELF;
      // Reception counter
      if (inZ === 2 && inX >= 4 && inX <= 9) return B.COUNTER;
      // Meeting tables and chairs
      if (inZ >= 5 && inZ <= 10 && inX >= 2 && inX <= 11) {
        if (inX % 4 === 2 && inZ % 3 === 2) return B.TABLE;
        if ((inX % 4 === 1 || inX % 4 === 3) && inZ % 3 === 2) return B.CHAIR;
      }
      if (inX === 3  && inZ === 11) return B.LAMP;
      if (inX === 10 && inZ === 11) return B.LAMP;
      return B.AIR;
  }
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

          if (col.type === 'park') {
            // y < baseY already handled above; everything at/above baseY is grass or air
            if (y === baseY) {
              data[idx] = B.GRASS;
              // ~15% of park tiles get a tree
              const pRng = ((city.seed * 77777 + wx * 12391 + wz * 87173) >>> 0) / 0xffffffff;
              if (pRng < 0.15) treePositions.push({ lx, lz, surfY: baseY, snowy: false });
            } else {
              data[idx] = B.AIR;
            }
            continue;
          }

          // Building column
          const bh  = col.height;
          const relY = y - baseY;
          if (y === baseY) {
            // Escalator column gets a flush floor tile instead of plain concrete
            data[idx] = (!col.isPerimeter && col.inX === 2 && col.inZ === 2)
              ? B.ESCALATOR_UP : B.CONCRETE;
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
              const floorNum   = Math.floor(relY / 3);
              if (blockInFlr === 0) {
                if (col.inX === 2 && col.inZ === 2) {
                  // Escalator tile flush at every floor level — player stands on it
                  data[idx] = B.ESCALATOR_UP;
                } else if (col.inX === 3 && col.inZ === 2) {
                  // Step-off shaft stays open so players can drop down
                  data[idx] = B.AIR;
                } else {
                  data[idx] = B.PLANKS;
                }
              } else {
                data[idx] = interiorBlock(col.inX, col.inZ, floorNum, blockInFlr, col.wallAxisX, col.buildingType);
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
      // Low-freq flatness mask: 0 = full mountains, 1 = flat plains
      const flatNoise = noise2D(wx * 0.003 + 300, wz * 0.003 + 300);
      const _ft = Math.max(0, Math.min(1, (flatNoise + 0.25) * 1.6));
      const flatMask = _ft * _ft * (3 - 2 * _ft); // smoothstep 0→1

      const continent = noise2D(wx * 0.006, wz * 0.006);
      const hill      = noise2D(wx * 0.02,  wz * 0.02) * 0.5;
      const detail    = noise2D(wx * 0.06,  wz * 0.06) * 0.25;
      const mountain  = Math.max(0, noise2D(wx * 0.004 + 50, wz * 0.004 + 50));

      // In flat regions suppress hills, detail, and mountains completely
      const raw = continent * lerp(1, 0.3, flatMask)
                + hill      * (1 - flatMask * 0.92)
                + detail    * (1 - flatMask * 0.88)
                + mountain  * 0.8 * (1 - flatMask);
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
          // Don't let tree leaves grow into city building columns
          const cityL = getCityInfo(chunkX * 16 + lxl, chunkZ * 16 + lzl, worldSeed);
          if (cityL) {
            const colL = getCityColumn(cityL.localX, cityL.localZ, cityL.density, cityL.seed);
            if (colL.type === 'building') continue;
          }
          const lidx = blockIndex(lxl, ly, lzl);
          if (data[lidx] === B.AIR) data[lidx] = B.LEAVES;
        }
      }
    }
  }

  return data;
}
