import { AIR } from '../src/blocks.js';
import { shelterPlan, validShelter } from './shelter.js';
import { positionKey } from './world.js';

export const distance = (a, b) => Math.abs(a.x-b.x) + Math.abs(a.z-b.z);

export function homePlan(state) {
  const home = state.home ?? state.shelters?.[0];
  if (!home?.position || !home.entrance) return null;
  return shelterPlan(home.position, [home.entrance.x-home.position.x, home.entrance.z-home.position.z]);
}

export function inspectHome(world, next, remember) {
  const plan = homePlan(next);
  if (!plan) return;
  const home = next.home ??= { position: plan.center, entrance: plan.entrance, complete: null, reachable: null };
  if (distance(next, plan.center) > 8 || Math.abs(next.y-plan.center.y) > 4) return;
  const complete = validShelter(world, plan, plan.blocks.length, false, false);
  const usable = complete && [plan.center, plan.entrance].every(({ x,y,z }) =>
    world.getBlock(x,y,z) === AIR && world.getBlock(x,y+1,z) === AIR);
  if (complete && usable !== home.usable && !usable) {
    home.reachable = false;
    remember(next, 'home', 'failed', 'Found the home entrance or interior obstructed', { destination: plan.center });
  }
  if (usable && home.usable === false) home.reachable = null;
  home.usable = usable;
  if (complete !== home.complete) {
    home.complete = complete;
    if (!complete) {
      home.reachable = null;
      remember(next, 'home', 'failed', 'Inspected home and found shelter damage', { destination: plan.center });
    } else {
      remember(next, 'home', 'success', 'Inspected home and found the shelter intact', { destination: plan.center });
    }
  }
}

export function homeRoute(world, next) {
  const home = next.home;
  if (!home?.usable || distance(next, home.position) > 18) return null;
  const key = positionKey(next);
  if (key === positionKey(home.position)) return [];
  const toCenter = world.stepTo(home.entrance, home.position.x, home.position.z);
  if (!toCenter || positionKey(toCenter) !== positionKey(home.position)) return null;
  const entrance = world.survey(next, next.obstacles, 18).queue.find(entry => positionKey(entry.position) === positionKey(home.entrance));
  return entrance ? [...entrance.route, toCenter] : null;
}
