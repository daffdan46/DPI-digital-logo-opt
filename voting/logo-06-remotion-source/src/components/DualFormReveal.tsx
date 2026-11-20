import React from 'react';
import {ANNOTATIONS, COLORS, COPY, FONT_STACK, TEXT, TL} from '../config';
import {formOf, formXF, applyXF} from '../choreography';
import {LOGO} from '../logoData';
import {toCanvas} from '../layout';
import {easyEase, prog} from '../motion';
import {Support, Title} from './Typography';

const w = (f: number, r: readonly [number, number], e = easyEase) => prog(f, r[0], r[1] - r[0], e);

/**
 * Scene 01 "Different Forms": dua bentuk asli muncul terpisah (kiri & kanan) lewat fade, geser halus, dan skala kecil.
 * Label di bawah masing-masing bentuk; tidak ada yang tampil dominan (ukuran dan bobot label sama).
 */
export const DualFormReveal: React.FC<{frame: number}> = ({frame}) => {
  const out = 1 - w(frame, TL.s1.out);
  const lab = (id: 'left' | 'right', text: string, r: readonly [number, number]) => {
    const f = formOf(id);
    const [cx] = applyXF(id, [f.cx, f.cy], formXF(id, TL.s1.out[0]));
    const [x] = toCanvas(cx, 0);
    const t = w(frame, r);
    return (
      <text x={x} y={TEXT.labelY + (1 - t) * 14} textAnchor="middle" fontFamily={FONT_STACK} fontSize={22} fontWeight={500} letterSpacing={5} fill={COLORS.grey} opacity={t * out}>
        {text}
      </text>
    );
  };
  void LOGO;
  return (
    <g>
      {ANNOTATIONS.labels && lab('left', COPY.s1.left, TL.s1.labelL)}
      {ANNOTATIONS.labels && lab('right', COPY.s1.right, TL.s1.labelR)}
      <Title id="s1" frame={frame} inR={TL.s1.title} outR={TL.s1.out}>
        {COPY.s1.title}
      </Title>
      <Support frame={frame} inR={TL.s1.support} outR={TL.s1.out}>
        {COPY.s1.support}
      </Support>
    </g>
  );
};
