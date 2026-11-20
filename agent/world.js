import * as B from '../src/blocks.js';
import { blockIndex, CHUNK_HEIGHT, CHUNK_SIZE, createChunkGenerator } from '../src/terrain.js';

const DIRECTIONS = [[1, 0], [0, 1], [-1, 0], [0, -1]];
const GATHERABLE = [B.WOOD, B.CLAY, B.SAND, B.GRAVEL, B.SNOW_BLOCK, B.GRASS, B.DIRT, B.STONE, B.COAL_ORE, B.IRON_ORE, B.GOLD_ORE, B.DIAMOND_ORE];
export const positionKey = ({ x, y, z }) => `${x},${y},${z}`;
const blockedKey = (from, x, z) => `${positionKey(from)}>${x},${z}`;

export function createExplorerWorld(seed, edits, placements = {}) {
  const generate = createChunkGenerator(seed);
  const chunks = new Map();

  function getBlock(x, y, z) {
    if (y < 0 || y >= CHUNK_HEIGHT) return B.AIR;
    const keyAt = positionKey({ x, y, z });
    if (Object.hasOwn(placements, keyAt)) return placements[keyAt];
    if (Object.hasOwn(edits, keyAt)) return B.AIR;
    const cx = Math.floor(x / CHUNK_SIZE);
    const cz = Math.floor(z / CHUNK_SIZE);
    const key = `${cx},${cz}`;
    if (!chunks.has(key)) {
      if (chunks.size >= 32) chunks.delete(chunks.keys().next().value);
      chunks.set(key, generate(cx, cz));
    }
    return chunks.get(key)[blockIndex(x - cx * CHUNK_SIZE, y, z - cz * CHUNK_SIZE)];
  }

  function isClear(x, y, z) {
    const id = getBlock(x, y, z);
    return !B.isSolid(id) && !B.isLiquid(id);
  }

  function canStand({ x, y, z }) {
    const floor = getBlock(x, y - 1, z);
    return B.isSolid(floor) && floor !== B.FENCE && floor !== B.ESCALATOR_UP &&
      isClear(x, y, z) && isClear(x, y + 1, z);
  }

  function stepTo(from, x, z) {
    if (Math.abs(x - from.x) + Math.abs(z - from.z) !== 1) return null;
    for (const dy of [0, 1, -1]) {
      const y = from.y + dy;
      const next = { x, y, z };
      if (!canStand(next)) continue;
      if (dy === 1 && !isClear(from.x, y + 1, from.z)) continue;
      if (dy === -1 && !isClear(x, from.y + 1, z)) continue;
      return next;
    }
    return null;
  }

  function spawn(x, z) {
    for (let radius = 0; radius <= 32; radius++) {
      for (let dx = -radius; dx <= radius; dx++) {
        for (let dz = -radius; dz <= radius; dz++) {
          if (Math.max(Math.abs(dx), Math.abs(dz)) !== radius) continue;
          for (let y = CHUNK_HEIGHT; y >= 2; y--) {
            const position = { x: x + dx, y, z: z + dz };
            const floor = getBlock(position.x, y - 1, position.z);
            if (floor === B.AIR) continue;
            if (floor !== B.LEAVES && floor !== B.WOOD && canStand(position) &&
                DIRECTIONS.some(([a, b]) => stepTo(position, position.x + a, position.z + b))) {
              return position;
            }
            break;
          }
        }
      }
    }
    throw new Error('No safe Explorer spawn near saved coordinates');
  }

  function resources(from) {
    const found = [];
    for (const [dx, dz] of DIRECTIONS) {
      const x = from.x + dx;
      const z = from.z + dz;
      for (const y of [from.y + 1, from.y, from.y - 1]) {
        const id = getBlock(x, y, z);
        if (!GATHERABLE.includes(id)) continue;
        // The block below foot level is accessible through its exposed top.
        if (y === from.y - 1 && !isClear(x, y + 1, z)) continue;
        found.push({ x, y, z, id });
      }
    }
    return found;
  }

  function tableSites({ x, y, z }) {
    return DIRECTIONS.map(([dx, dz]) => ({ x: x + dx, y, z: z + dz }));
  }

  function nearbyTable(position) {
    return tableSites(position).find(({ x, y, z }) => getBlock(x, y, z) === B.CRAFTING);
  }

  function tablePlacement(position) {
    const sites = tableSites(position);
    // Leave at least one walkable exit after placing the table.
    const exits = sites.filter(({ x, z }) => stepTo(position, x, z));
    return sites.find(site => getBlock(site.x, site.y, site.z) === B.AIR &&
      B.isSolid(getBlock(site.x, site.y - 1, site.z)) &&
      exits.some(exit => exit !== site));
  }

  function excavation(position) {
    const soft = [B.GRASS, B.DIRT, B.SAND, B.GRAVEL, B.CLAY, B.SNOW_BLOCK];
    const sites = [];
    for (const [dx, dz] of DIRECTIONS) {
      const x = position.x + dx;
      const z = position.z + dz;
      const y = position.y - 1;
      const floor = getBlock(x, y - 1, z);
      if (!B.isSolid(floor) || floor === B.FENCE || floor === B.ESCALATOR_UP) continue;
      const covering = [y + 2, y + 1, y].map(by => ({ x, y: by, z, id: getBlock(x, by, z) }));
      if (covering.some(block => block.id !== B.AIR && !soft.includes(block.id))) continue;
      if ([y, y + 1, y + 2].some(by => DIRECTIONS.some(([a, b]) => B.isLiquid(getBlock(x + a, by, z + b))))) continue;
      const blockers = covering.filter(block => block.id !== B.AIR);
      if (blockers.length) sites.push({ position: { x, y, z }, blockers });
    }
    return sites.sort((a, b) => a.blockers.length - b.blockers.length)[0];
  }

  function survey(start, blocked) {
    const queue = [{ position: start, route: [] }];
    const seen = new Set([positionKey(start)]);
    const obstacles = [];
    for (const { position, route } of queue) {
      if (route.length >= 8) continue;
      for (const [dx, dz] of DIRECTIONS) {
        const x = position.x + dx;
        const z = position.z + dz;
        const key = blockedKey(position, x, z);
        if (blocked[key]) continue;
        const step = stepTo(position, x, z);
        if (!step) {
          if (!route.length) obstacles.push({ key, x, z });
          continue;
        }
        if (seen.has(positionKey(step))) continue;
        seen.add(positionKey(step));
        queue.push({ position: step, route: [...route, step] });
      }
    }
    return { queue, obstacles };
  }

  return { getBlock, spawn, stepTo, resources, survey, nearbyTable, tablePlacement, excavation };
}
