import * as B from '../src/blocks.js';
import { CHUNK_HEIGHT } from '../src/terrain.js';
import { positionKey } from './world.js';

export const SHELTER_GOAL = 'Build a small shelter';
const sides = [[0, -1], [1, 0], [0, 1], [-1, 0]];
const ground = [B.GRASS, B.DIRT, B.STONE, B.SAND, B.GRAVEL, B.SNOW_BLOCK];

export function shelterPlan(center, direction) {
  const { x, y, z } = center;
  const [dx, dz] = direction;
  const entrance = { x: x + dx, y, z: z + dz };
  const outside = { x: x + 2 * dx, y, z: z + 2 * dz };
  const floor = [];
  const blocks = [];
  for (let a = -1; a <= 1; a++) {
    for (let b = -1; b <= 1; b++) floor.push({ x: x + a, y: y - 1, z: z + b });
  }
  // Place bottom walls first, then upper walls, then the supported roof.
  for (let height = 0; height < 3; height++) {
    const layer = floor.map(p => ({ ...p, y: y + height }));
    for (const block of layer) {
      if (height < 2 && ((block.x === x && block.z === z) ||
          (block.x === entrance.x && block.z === entrance.z))) continue;
      blocks.push(block);
    }
  }
  return { center, entrance, outside, floor, blocks };
}

export function validShelter(world, plan, progress = 0, checkApproach = true, checkEntrance = true) {
  const block = ({ x, y, z }) => world.getBlock(x, y, z);
  const clear = p => block(p) === B.AIR && block({ ...p, y: p.y + 1 }) === B.AIR;
  if (plan.center.y + 2 >= CHUNK_HEIGHT || !plan.floor.every(p => ground.includes(block(p)))) return false;
  if ((checkEntrance && (!clear(plan.center) || !clear(plan.entrance))) || (checkApproach && !clear(plan.outside))) return false;
  if (checkApproach && !ground.includes(block({ ...plan.outside, y: plan.outside.y - 1 }))) return false;
  return plan.blocks.every((p, index) => block(p) === (index < progress ? B.PLANKS : B.AIR));
}

export function findShelter(world, queue, rejected) {
  const unsuitable = [];
  for (const entry of queue) {
    const key = positionKey(entry.position);
    if (rejected[key]) continue;
    for (const direction of sides) {
      const plan = shelterPlan(entry.position, direction);
      if (validShelter(world, plan)) return { entry, plan, unsuitable };
    }
    unsuitable.push(key);
  }
  return { unsuitable };
}
