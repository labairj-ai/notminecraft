import { randomUUID } from 'node:crypto';
import * as B from '../src/blocks.js';
import { CHUNK_HEIGHT } from '../src/terrain.js';
import { positionKey } from './world.js';

export const session = randomUUID();
export const gameOrigin = origin => /^(http:\/\/(localhost|127\.0\.0\.1):5177)$/.test(origin);
const directions = [[1,0,0], [-1,0,0], [0,1,0], [0,-1,0], [0,0,1], [0,0,-1]];
export const voxelNeighbors = ({ x, y, z }) => directions.map(([a,b,c]) => ({ x:x+a, y:y+b, z:z+c }));

function cell(p) {
  return p && [p.x,p.y,p.z].every(Number.isSafeInteger) && p.y >= 0 && p.y < CHUNK_HEIGHT &&
    Math.abs(p.x) <= 1000000 && Math.abs(p.z) <= 1000000;
}

export async function readEdit(req) {
  let text = '';
  for await (const chunk of req) {
    text += chunk;
    if (text.length > 2048) return null;
  }
  try { return JSON.parse(text); } catch { return null; }
}

export function validateEdit(world, state, edit) {
  if (!edit || edit.seed !== state.seed || !cell(edit) || !Number.isInteger(edit.id)) return 400;
  const { x, y, z, id, before, revision, eye, tool, anchor } = edit;
  if (!eye || ![eye.x,eye.y,eye.z].every(Number.isFinite) ||
      Math.hypot(x+.5-eye.x, y+.5-eye.y, z+.5-eye.z) > 6) return 400;
  if (revision !== (state.voxelRevisions?.[positionKey(edit)] ?? 0) || before !== world.getBlock(x,y,z)) return 409;
  if (id === before) return 400;
  if (id === B.AIR) return Number.isFinite(B.blockBreakTime(before, tool)) ? 200 : 400;
  if ((before === B.DOOR_OPEN && id === B.DOOR_CLOSED) || (before === B.DOOR_CLOSED && id === B.DOOR_OPEN)) return 200;
  if (before !== B.AIR || !B.getDef(id) || B.getDef(id).unbreakable || !cell(anchor) ||
      Math.abs(anchor.x-x)+Math.abs(anchor.y-y)+Math.abs(anchor.z-z) !== 1 ||
      !B.isSolid(world.getBlock(anchor.x, anchor.y, anchor.z))) return 400;
  if ((state.x === x && state.z === z && y >= state.y && y <= state.y+1) ||
      (Math.floor(eye.x) === x && Math.floor(eye.z) === z && Math.abs(y-Math.floor(eye.y-1.62)) <= 2)) return 400;
  return 200;
}

export function refreshRoutes(next, { x, z }) {
  for (const [key, target] of Object.entries(next.obstacles)) {
    const [sx, , sz] = key.split('>')[0].split(',').map(Number);
    if ((sx === x && sz === z) || (target.x === x && target.z === z)) delete next.obstacles[key];
  }
  for (const [key, position] of Object.entries(next.failedDestinations)) {
    const [fx, , fz] = key.split(',').map(Number);
    if (Math.abs(fx-x)+Math.abs(fz-z) <= 1 ||
        (position?.x !== undefined && Math.abs(position.x-x)+Math.abs(position.z-z) <= 1)) delete next.failedDestinations[key];
  }
}

export function recordPlayerEdit(next, edit) {
  const { x, y, z, before, id } = edit;
  const key = positionKey(edit);
  if (id === B.AIR) {
    delete next.placedBlocks[key];
    next.removedBlocks[key] = before;
  } else next.placedBlocks[key] = id;
  (next.playerChanges ??= {})[key] = { x, y, z, before, id, revision: (next.revision ?? 0) + 1 };
  refreshRoutes(next, edit);
}
