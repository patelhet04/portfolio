/** The shared time axis for the home trace and the span pages: Jan 2016 to about six months past today. */
export function axisRange(now: Date): [Date, Date] {
  return [new Date(2016, 0, 1), new Date(now.getFullYear(), now.getMonth() + 7, 1)];
}

export const pct = (d: Date, t0: Date, t1: Date) => ((d.getTime() - t0.getTime()) / (t1.getTime() - t0.getTime())) * 100;

/** Tick labels at either end of the axis align inward so they aren't clipped. */
export const tickEdge = (p: number) => (p < 2 ? "start" : p > 96 ? "end" : undefined);

/** Whether a span's duration label fits inside its bar. Martian Mono advances about 0.7em per character. */
export const labelFits = (label: string, barPx: number, { fontPx = 10.5, padding = 18 } = {}) => barPx >= label.length * fontPx * 0.7 + padding;
