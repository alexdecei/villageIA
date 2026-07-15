import type { ActiveDirective, VisualDirective } from '../domain/types';

/**
 * Garde-fous des directives visuelles.
 * Le moteur graphique contrôle la FORME (taille, densité, durée, contraste),
 * jamais le SENS. Toute directive non conforme est rejetée silencieusement
 * (comptée pour le debug).
 */

export interface GuardrailConfig {
  maxGlyphChars: number;
  maxSloganChars: number;
  maxSignsPerTarget: number;
  maxSymbolsPerTarget: number;
  maxBanners: number;
  maxAmbientIntensity: number;
  symbolSizes: Record<'small' | 'medium', number>;
}

export const GUARDRAILS: GuardrailConfig = {
  maxGlyphChars: 4, // un emoji peut peser plusieurs unités UTF-16
  maxSloganChars: 40,
  maxSignsPerTarget: 1,
  maxSymbolsPerTarget: 2,
  maxBanners: 3,
  maxAmbientIntensity: 0.14,
  symbolSizes: { small: 15, medium: 20 },
};

function targetKey(d: VisualDirective): string {
  if ('target' in d) {
    const t = d.target;
    return t.kind === 'point' ? `point:${t.pos.x},${t.pos.y}` : `${t.kind}:${t.id}`;
  }
  return 'global';
}

/** Filtre une liste de directives actives selon les garde-fous. Pure et testable. */
export function applyGuardrails(directives: ActiveDirective[]): { accepted: ActiveDirective[]; rejected: number } {
  const accepted: ActiveDirective[] = [];
  let rejected = 0;
  const signCount = new Map<string, number>();
  const symbolCount = new Map<string, number>();
  let banners = 0;

  for (const ad of directives) {
    const d = ad.directive;
    let ok = true;
    if ('glyph' in d && d.glyph && [...d.glyph].length * 2 > GUARDRAILS.maxGlyphChars * 2 && d.glyph.length > GUARDRAILS.maxGlyphChars) ok = false;
    switch (d.type) {
      case 'sign': {
        const k = targetKey(d);
        const n = signCount.get(k) ?? 0;
        if (n >= GUARDRAILS.maxSignsPerTarget) ok = false;
        if (d.slogan && d.slogan.length > GUARDRAILS.maxSloganChars) d.slogan = d.slogan.slice(0, GUARDRAILS.maxSloganChars);
        if (ok) signCount.set(k, n + 1);
        break;
      }
      case 'symbol': {
        const k = targetKey(d);
        const n = symbolCount.get(k) ?? 0;
        if (n >= GUARDRAILS.maxSymbolsPerTarget) ok = false;
        else symbolCount.set(k, n + 1);
        break;
      }
      case 'banner':
        if (banners >= GUARDRAILS.maxBanners) ok = false;
        else banners++;
        break;
      case 'ambient':
        d.intensity = Math.min(d.intensity, GUARDRAILS.maxAmbientIntensity);
        break;
      case 'palette-shift':
        d.intensity = Math.min(d.intensity, 0.5);
        break;
    }
    if (ok) accepted.push(ad);
    else rejected++;
  }
  return { accepted, rejected };
}
