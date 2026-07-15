import type { Rng } from '../rng';
import type { Villager, WorldState, Vec2 } from '../../domain/types';

function jitter(rng: Rng, p: Vec2, r: number): Vec2 {
  return { x: p.x + rng.range(-r, r), y: p.y + rng.range(-r, r) };
}

function findDoor(world: WorldState, buildingId: string): Vec2 {
  const b = world.buildings.find((b) => b.id === buildingId);
  return b ? b.door : { x: 0, y: 0 };
}

function socialSpot(world: WorldState, rng: Rng): Vec2 {
  const spots = world.spots.filter((s) => s.tags.includes('social'));
  const s = rng.pick(spots);
  return jitter(rng, s.pos, s.radius * 0.7);
}

/**
 * Choisit la prochaine activité d'un habitant inactif.
 * Tous les habitants ne sont pas constamment actifs : pauses et repos inclus.
 */
export function decideNext(v: Villager, world: WorldState, rng: Rng): void {
  // Partage actif d'une idée : rejoindre un lieu social et y rester.
  const sharingCulture = world.sharing[v.id];
  if (sharingCulture && rng.chance(0.65)) {
    v.activity = 'share';
    v.target = socialSpot(world, rng);
    v.activityUntil = world.timeS + rng.range(14, 22);
    return;
  }

  const roll = rng.next();
  if (roll < 0.42) {
    v.activity = 'work';
    v.target = jitter(rng, findDoor(world, v.workId), 14);
    v.activityUntil = world.timeS + rng.range(16, 30);
  } else if (roll < 0.62) {
    v.activity = 'idle';
    // flâner près d'un point d'intérêt quelconque
    const spot = rng.pick(world.spots);
    v.target = jitter(rng, spot.pos, spot.radius);
    v.activityUntil = world.timeS + rng.range(8, 16);
  } else if (roll < 0.85) {
    v.activity = 'idle'; // disponible pour discuter, se dirige vers un lieu social
    v.target = socialSpot(world, rng);
    v.activityUntil = world.timeS + rng.range(10, 18);
  } else {
    v.activity = 'rest';
    v.target = jitter(rng, findDoor(world, v.homeId), 8);
    v.activityUntil = world.timeS + rng.range(12, 20);
  }
}
