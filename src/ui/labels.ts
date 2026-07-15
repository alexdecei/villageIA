export const ACTIVITY_LABELS: Record<string, string> = {
  idle: 'flâne',
  walk: 'se promène',
  work: 'travaille',
  chat: 'discute',
  gather: 'participe à un rassemblement',
  rest: 'se repose',
  share: 'partage une idée',
};

export function formatTime(timeS: number, dayLengthS: number): string {
  const day = Math.floor(timeS / dayLengthS) + 1;
  const frac = (timeS % dayLengthS) / dayLengthS;
  const hourF = 6 + frac * 16; // journée de 6h à 22h
  const h = Math.floor(hourF);
  const m = Math.floor((hourF - h) * 60);
  return `Jour ${day} · ${String(h).padStart(2, '0')}h${String(m).padStart(2, '0')}`;
}
