import React from 'react';
import {ANNOTATIONS, COLORS, TL} from '../config';
import {LOGO} from '../logoData';
import {logoTransform, shiftAt} from '../layout';
import {easeInOut, prog} from '../motion';

/** Lockup final: simbol bergeser, wordmark asli (hanya di-recolor #1D1D1B) terungkap dengan clip kiri→kanan. */
export const FinalBrandReveal: React.FC<{frame: number}> = ({frame}) => {
  const word = prog(frame, TL.wordReveal[0], TL.wordReveal[1] - TL.wordReveal[0], easeInOut);
  const [wx0, wx1, wy0, wy1] = LOGO.wordBBox;
  if (!ANNOTATIONS.wordmark) return null;
  return (
    <g transform={logoTransform(shiftAt(frame))} opacity={word > 0 ? 1 : 0}>
      <clipPath id="wordClip" clipPathUnits="userSpaceOnUse">
        <rect x={wx0 - 6} y={wy0 - 14} width={Math.max(0.001, (wx1 - wx0 + 12) * word)} height={wy1 - wy0 + 28} />
      </clipPath>
      <g clipPath="url(#wordClip)" fill={COLORS.ink}>
        {LOGO.wordmark.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </g>
  );
};
