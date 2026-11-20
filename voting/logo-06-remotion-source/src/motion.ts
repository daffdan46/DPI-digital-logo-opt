import {Easing, interpolate} from 'remotion';
import {EASE} from './config';

// Semua kurva = Easy Ease (kecepatan 0 di awal & akhir, satu puncak). Tidak ada ease-out saja / linear.
export const easyEase = Easing.bezier(...EASE.easy);
export const easeInOut = Easing.bezier(...EASE.inOut);
export const assemble = Easing.bezier(...EASE.assemble);
export const rotateEase = Easing.bezier(...EASE.rotate);

export const prog = (frame: number, start: number, dur: number, easing: (t: number) => number = easeInOut) =>
  interpolate(frame, [start, start + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing});
export const win = (f: number, w: readonly [number, number], e: (t: number) => number = easeInOut) => prog(f, w[0], w[1] - w[0], e);
/** Interpolasi linear antar nilai; titik akhir tepat (tanpa galat floating) saat t >= 1. */
export const lerp = (a: number, b: number, t: number) => (t >= 1 ? b : a + (b - a) * t);
/** Pulse 0 -> 1 -> 0 dengan empat titik waktu (dua ramp Easy Ease). */
export const pulse = (f: number, w: readonly [number, number, number, number]) => prog(f, w[0], w[1] - w[0]) * (1 - prog(f, w[2], w[3] - w[2]));
