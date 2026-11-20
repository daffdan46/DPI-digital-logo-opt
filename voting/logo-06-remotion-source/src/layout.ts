import {LOGO_CENTER_Y, LOGO_SCALE, TL, WIDTH} from './config';
import {LOGO} from './logoData';
import {easeInOut, prog} from './motion';

export const K = LOGO_SCALE;
export const CX = WIDTH / 2;
export const CY = LOGO_CENTER_Y;

const [SX0, SX1, SY0, SY1] = LOGO.symbolBBox;
export const RCX = (SX0 + SX1) / 2; // pusat simbol (koordinat artwork)
export const RCY = (SY0 + SY1) / 2;
const LOCKUP_CX = (SX0 + LOGO.wordBBox[1]) / 2;
export const SHIFT_END = (RCX - LOCKUP_CX) * K;

export const shiftAt = (frame: number) => SHIFT_END * prog(frame, TL.shiftStart, TL.shiftDur, easeInOut);
export const logoTransform = (shiftX: number) => `translate(${CX + shiftX} ${CY}) scale(${K}) translate(${-RCX} ${-RCY})`;
export const toCanvas = (x: number, y: number, shiftX = 0): [number, number] => [CX + shiftX + (x - RCX) * K, CY + (y - RCY) * K];
