import React from 'react';
import {COLORS, FONT_STACK, TEXT, WIDTH} from '../config';
import {easeInOut, easyEase, prog} from '../motion';

type Range = readonly [number, number];

/** Progress masuk/keluar -> {t: 0..1 muncul, o: 0..1 hilang}. */
const inOut = (frame: number, inR: Range, outR?: Range) => ({
  t: prog(frame, inR[0], inR[1] - inR[0], easyEase),
  o: outR ? prog(frame, outR[0], outR[1] - outR[0], easeInOut) : 0,
});

/** Eyebrow kecil (tahap narasi semiotik): Visual Elements -> Relationship -> Meaning. */
export const Eyebrow: React.FC<{id: string; text: string; frame: number; inR: Range; outR?: Range; size?: number; weight?: number; spacing?: number; color?: string}> = ({id, text, frame, inR, outR, size = 22, weight = 500, spacing = 5, color = COLORS.grey}) => {
  const {t, o} = inOut(frame, inR, outR);
  return (
    <g>
      <clipPath id={`eb-${id}`}>
        <rect x={WIDTH / 2 - 500} y={TEXT.eyebrowY - 44} width={1000} height={64} />
      </clipPath>
      <g clipPath={`url(#eb-${id})`}>
        <text
          x={WIDTH / 2}
          y={TEXT.eyebrowY + (1 - t) * 40 - o * 14}
          textAnchor="middle"
          fontFamily={FONT_STACK}
          fontSize={size}
          fontWeight={weight}
          letterSpacing={spacing}
          fill={color}
          opacity={t * (1 - o)}
        >
          {text.toUpperCase()}
        </text>
      </g>
    </g>
  );
};

/** Judul scene: slide-up lewat mask, keluar dengan fade bersih. */
export const Title: React.FC<{id: string; frame: number; inR: Range; outR?: Range; children: React.ReactNode; y?: number}> = ({id, frame, inR, outR, children, y = TEXT.titleY}) => {
  const {t, o} = inOut(frame, inR, outR);
  return (
    <g>
      <clipPath id={`tt-${id}`}>
        <rect x={WIDTH / 2 - 700} y={y - 70} width={1400} height={96} />
      </clipPath>
      <g clipPath={`url(#tt-${id})`}>
        <text
          x={WIDTH / 2}
          y={y + (1 - t) * 70 - o * 18}
          textAnchor="middle"
          fontFamily={FONT_STACK}
          fontSize={54}
          fontWeight={600}
          fill={COLORS.ink}
          opacity={t * (1 - o)}
        >
          {children}
        </text>
      </g>
    </g>
  );
};

/** Teks pendukung: fade + slide-up halus. */
export const Support: React.FC<{frame: number; inR: Range; outR?: Range; children: React.ReactNode; y?: number; size?: number; color?: string}> = ({frame, inR, outR, children, y = TEXT.supportY, size = 28, color = COLORS.grey}) => {
  const {t, o} = inOut(frame, inR, outR);
  return (
    <g transform={`translate(0 ${(1 - t) * 14})`} opacity={t * (1 - o)}>
      <text x={WIDTH / 2} y={y} textAnchor="middle" fontFamily={FONT_STACK} fontSize={size} fontWeight={400} fill={color}>
        {children}
      </text>
    </g>
  );
};
