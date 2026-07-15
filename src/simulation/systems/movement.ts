import type { Villager } from '../../domain/types';

const SPEED = 42; // px/s

/** Déplacement en ligne droite vers la cible, sans pathfinding (carte ouverte). */
export function updateMovement(v: Villager, dt: number): void {
  if (!v.target) return;
  const dx = v.target.x - v.pos.x;
  const dy = v.target.y - v.pos.y;
  const d = Math.hypot(dx, dy);
  if (d < 3) {
    v.pos = { ...v.target };
    v.target = null;
    return;
  }
  const step = Math.min(SPEED * dt, d);
  v.pos = { x: v.pos.x + (dx / d) * step, y: v.pos.y + (dy / d) * step };
}

export function isMoving(v: Villager): boolean {
  return v.target !== null;
}
