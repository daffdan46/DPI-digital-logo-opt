import React from 'react';
import {ANNOTATIONS, COLORS, COPY, FONT_STACK, TEXT, TL, WIDTH} from '../config';
import {easyEase, prog} from '../motion';
import {Support, Title} from './Typography';

/** Scene 07 "Final Meaning Synthesis": semua overlay sudah hilang; THE RIGHT MATCH, lalu dua baris pendukung. Narasi presentasi, BUKAN tagline resmi. */
export const MeaningSynthesis: React.FC<{frame: number}> = ({frame}) => {
  const dis = prog(frame, TL.finalDisclaimer[0], TL.finalDisclaimer[1] - TL.finalDisclaimer[0], easyEase);
  return (
    <g>
      <Title id="s7" frame={frame} inR={TL.finalTitle}>
        {COPY.s7.title}
      </Title>
      <Support frame={frame} inR={TL.line1} size={30} color={COLORS.ink}>
        {COPY.s7.line1}
      </Support>
      <Support frame={frame} inR={TL.line2} y={TEXT.support2Y} size={26}>
        {COPY.s7.line2}
      </Support>
      {ANNOTATIONS.disclaimer && (
        <text x={WIDTH / 2} y={TEXT.disclaimerY} textAnchor="middle" fontFamily={FONT_STACK} fontSize={18} letterSpacing={1} fill={COLORS.grey} opacity={0.7 * dis}>
          {COPY.s7.disclaimer}
        </text>
      )}
    </g>
  );
};
