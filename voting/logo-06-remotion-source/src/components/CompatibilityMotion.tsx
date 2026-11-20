import React from 'react';
import {ANNOTATIONS, COLORS, COPY, TL} from '../config';
import {applyXF, formOf, formXF} from '../choreography';
import {LOGO} from '../logoData';
import {CX, toCanvas} from '../layout';
import {easeInOut, prog} from '../motion';
import {Support, Title} from './Typography';

const w = (f: number, r: readonly [number, number]) => prog(f, r[0], r[1] - r[0], easeInOut);

/**
 * Scene 02 "Finding Compatibility": gerak dua bentuk ada di choreography.ts (timeline global). Guide hubungan:
 * sumbu tipis melalui titik temu, tick di apex masing-masing bentuk (menempel pada bentuk), dan konektor di antara
 * kedua tick yang memendek saat bentuk mendekat. Semua hanya overlay dan hilang setelah titik temu terbaca.
 */
export const CompatibilityMotion: React.FC<{frame: number}> = ({frame}) => {
  const a = w(frame, TL.gRel.draw);
  const o = 1 - w(frame, TL.gRel.out);
  const vis = a * o;
  const [, y0] = toCanvas(0, LOGO.geo.meet[1]);
  const tick = (id: 'left' | 'right') => {
    const p = applyXF(id, formOf(id).apex as unknown as [number, number], formXF(id, frame));
    return toCanvas(p[0], p[1]);
  };
  const [lx] = tick('left');
  const [rx] = tick('right');
  const sw = 2;
  return (
    <g>
      {ANNOTATIONS.relationGuides && vis > 0 && (
        <g opacity={vis} stroke={COLORS.grey} strokeWidth={sw} strokeLinecap="round" fill="none">
          <line x1={CX - 640} y1={y0} x2={CX + 640} y2={y0} strokeDasharray="2 9" opacity={0.7} />
          <line x1={lx} y1={y0 - 16} x2={lx} y2={y0 + 16} />
          <line x1={rx} y1={y0 - 16} x2={rx} y2={y0 + 16} />
          <line x1={lx} y1={y0} x2={rx} y2={y0} stroke={COLORS.ink} strokeWidth={1.6} />
        </g>
      )}
      <Title id="s2" frame={frame} inR={TL.s2.title} outR={TL.s2.out}>
        {COPY.s2.title}
      </Title>
      <Support frame={frame} inR={TL.s2.support} outR={TL.s2.out}>
        {COPY.s2.support}
      </Support>
    </g>
  );
};
