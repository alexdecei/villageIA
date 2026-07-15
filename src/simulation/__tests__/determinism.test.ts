import { describe, it, expect } from 'vitest';
import { VillageSim } from '../engine';
import { CONTENT } from '../../content';
import { applyGuardrails, GUARDRAILS } from '../../rendering/directives';
import type { ActiveDirective } from '../../domain/types';

function snapshot(sim: VillageSim) {
  return {
    positions: sim.world.villagers.map((v) => [v.id, Math.round(v.pos.x * 100), Math.round(v.pos.y * 100), v.activity]),
    events: sim.world.events.map((e) => e.text),
    affinities: sim.world.villagers.map((v) => [v.id, v.affinities]),
    directives: sim.world.directives.map((d) => d.directive),
  };
}

describe('simulation déterministe', () => {
  it('une seed identique reproduit exactement la démonstration', () => {
    const a = new VillageSim(CONTENT, 12345);
    const b = new VillageSim(CONTENT, 12345);
    for (let i = 0; i < 320 * 4; i++) {
      a.step(0.25);
      b.step(0.25);
    }
    expect(snapshot(a)).toEqual(snapshot(b));
  });

  it('des seeds différentes divergent', () => {
    const a = new VillageSim(CONTENT, 1);
    const b = new VillageSim(CONTENT, 2);
    for (let i = 0; i < 200; i++) {
      a.step(0.25);
      b.step(0.25);
    }
    expect(JSON.stringify(snapshot(a).positions)).not.toEqual(JSON.stringify(snapshot(b).positions));
  });

  it('le scénario de la Mie se déroule (événements et directives émis)', () => {
    const sim = new VillageSim(CONTENT, 20260712);
    for (let i = 0; i < 320 * 4; i++) sim.step(0.25);
    const texts = sim.world.events.map((e) => e.text).join('\n');
    expect(texts).toContain('Doctrine de la Mie');
    expect(sim.world.cultures.mie.adherents.length).toBeGreaterThanOrEqual(3);
    expect(sim.world.directives.length).toBeGreaterThan(0);
    // les directives sont sérialisables
    expect(() => JSON.stringify(sim.world.directives)).not.toThrow();
  });

  it('les événements produits sont valides', () => {
    const sim = new VillageSim(CONTENT, 42);
    for (let i = 0; i < 600; i++) sim.step(0.25);
    for (const e of sim.world.events) {
      expect(['info', 'social', 'culture', 'alert']).toContain(e.kind);
      expect(e.text.length).toBeGreaterThan(0);
      expect([1, 2, 3]).toContain(e.importance);
    }
  });
});

describe('garde-fous des directives visuelles', () => {
  const mk = (directive: ActiveDirective['directive'], i: number): ActiveDirective => ({
    id: `d${i}`,
    directive,
    issuedAt: 0,
    expiresAt: null,
  });

  it('limite le nombre de bannières', () => {
    const list = Array.from({ length: 6 }, (_, i) =>
      mk({ type: 'banner', target: { kind: 'spot', id: 'puits' }, color: '#fff' }, i),
    );
    const { accepted, rejected } = applyGuardrails(list);
    expect(accepted.length).toBe(GUARDRAILS.maxBanners);
    expect(rejected).toBe(6 - GUARDRAILS.maxBanners);
  });

  it('limite les enseignes par bâtiment et tronque les slogans', () => {
    const long = 'x'.repeat(120);
    const list = [
      mk({ type: 'sign', target: { kind: 'building', id: 'fournil' }, glyph: '🥖', slogan: long }, 0),
      mk({ type: 'sign', target: { kind: 'building', id: 'fournil' }, glyph: '🥖' }, 1),
    ];
    const { accepted, rejected } = applyGuardrails(list);
    expect(accepted.length).toBe(1);
    expect(rejected).toBe(1);
    const d = accepted[0].directive;
    if (d.type === 'sign') expect((d.slogan ?? '').length).toBeLessThanOrEqual(GUARDRAILS.maxSloganChars);
  });

  it("plafonne l'intensité d'ambiance", () => {
    const { accepted } = applyGuardrails([mk({ type: 'ambient', tint: '#ff0000', intensity: 0.9 }, 0)]);
    const d = accepted[0].directive;
    if (d.type === 'ambient') expect(d.intensity).toBeLessThanOrEqual(GUARDRAILS.maxAmbientIntensity);
  });
});
