import {FORM_IDS, FORM_START, HIGHLIGHT, TL, Y_SHARE} from './config';
import {LOGO} from './logoData';
import {assemble, easeInOut, easyEase, lerp, prog, pulse, win} from './motion';

export type XF = {dx: number; dy: number; s: number; opacity: number};
export const formOf = (id: string) => LOGO.forms.find((f) => f.id === id)!;

/**
 * Transform satu bentuk pada SATU timeline global (tidak pernah di-reset antar scene). Sumbu x memakai kurva
 * `assemble` (start landai, deselerasi panjang), sumbu y memakai jendela lebih pendek (lintasan sedikit melengkung),
 * skala mengikuti sumbu x. Identitas pada frame akhir ⇒ identik dengan artwork.
 */
export const formXF = (id: string, frame: number): XF => {
  const c = FORM_START[id];
  const a = prog(frame, TL.appear[id], TL.appearDur, easyEase);
  const mv = TL.move[id];
  const px = win(frame, mv, assemble);
  const py = win(frame, [mv[0], mv[0] + (mv[1] - mv[0]) * Y_SHARE], easeInOut);
  return {
    dx: lerp(c.side * (c.dist + c.drift * (1 - a)), 0, px),
    dy: lerp(c.dy, 0, py),
    s: lerp(c.scale, 1, px),
    opacity: prog(frame, TL.appear[id], TL.fade, easyEase),
  };
};

export const isIdentity = (x: XF) => x.dx === 0 && x.dy === 0 && x.s === 1;
export const xfString = (id: string, x: XF) => {
  if (isIdentity(x)) return undefined;
  const f = formOf(id);
  return `translate(${x.dx} ${x.dy}) translate(${f.cx} ${f.cy}) scale(${x.s}) translate(${-f.cx} ${-f.cy})`;
};
/** Titik artwork setelah transform bentuk (untuk guide yang menempel pada bentuk). */
export const applyXF = (id: string, p: readonly [number, number], x: XF): [number, number] => {
  const f = formOf(id);
  return [f.cx + x.s * (p[0] - f.cx) + x.dx, f.cy + x.s * (p[1] - f.cy) + x.dy];
};

/** Level opasitas tiap bentuk: penekanan bergantian pada anotasi "Different Forms" (S4). */
export const formLevels = (frame: number): Record<string, number> => ({
  left: 1 - (1 - HIGHLIGHT.dimFocus) * pulse(frame, TL.focusR),
  right: 1 - (1 - HIGHLIGHT.dimFocus) * pulse(frame, TL.focusL),
});
export {FORM_IDS};
