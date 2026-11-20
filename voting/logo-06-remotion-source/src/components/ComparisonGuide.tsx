import React from 'react';
import {ANNOTATIONS, COLORS, COPY, FONT_STACK, GUIDE_POS, TL} from '../config';
import {easeInOut, prog, rotateEase} from '../motion';

const w = (f: number, r: readonly [number, number], e = easeInOut) => prog(f, r[0], r[1] - r[0], e);

/** Bintang 4 titik (sisi cekung) pada pusat (0,0); tip pertama ke atas. */
const starPath = (R: number, r: number) => {
  const tip = (k: number) => [R * Math.sin((k * Math.PI) / 2), -R * Math.cos((k * Math.PI) / 2)];
  const ctl = (k: number) => [r * Math.sin(((k + 0.5) * Math.PI) / 2), -r * Math.cos(((k + 0.5) * Math.PI) / 2)];
  let d = `M ${tip(0)[0]} ${tip(0)[1]}`;
  for (let k = 0; k < 4; k++) d += ` Q ${ctl(k)[0]} ${ctl(k)[1]} ${tip(k + 1)[0]} ${tip(k + 1)[1]}`;
  return d + ' Z';
};
const STAR = starPath(GUIDE_POS.starR, GUIDE_POS.starInner);

/**
 * Panel pembanding di samping logo (jelas terpisah dari artwork; berlabel COMPARISON GUIDE): bintang 4 titik yang berputar
 * halus 45° → 0° (ujung diagonal → N/E/S/W) sambil lingkaran + tanda arah muncul, sebagai transisi sparkle → compass.
 * Hanya referensi konseptual, bukan bagian logo.
 */
export const ComparisonGuide: React.FC<{frame: number}> = ({frame}) => {
  const a = w(frame, TL.star.draw);
  const o = 1 - w(frame, TL.guideOut);
  if (!(ANNOTATIONS.sparkle || ANNOTATIONS.compass) || a <= 0 || o <= 0) return null;
  const rot = 45 * (1 - w(frame, TL.rotGuide, rotateEase));
  const c = w(frame, TL.circle.draw);
  const {x, y, circleR} = GUIDE_POS;
  const ticks = [0, 90, 180, 270];
  return (
    <g opacity={o} transform={`translate(${x} ${y})`} fill="none" stroke={COLORS.grey} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <g transform={`rotate(${rot})`}>
        <path d={STAR} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - a} />
      </g>
      {c > 0 && ANNOTATIONS.compass && (
        <g>
          <circle r={circleR} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - c} transform="rotate(-90)" />
          {ticks.map((t) => (
            <line key={t} transform={`rotate(${t})`} x1={0} y1={-circleR - 6} x2={0} y2={-circleR - 6 - 16 * c} />
          ))}
        </g>
      )}
      <text x={0} y={circleR + 56} textAnchor="middle" fontFamily={FONT_STACK} fontSize={16} fontWeight={500} letterSpacing={4} fill={COLORS.grey} stroke="none" opacity={a}>
        {COPY.s5.guide}
      </text>
    </g>
  );
};
