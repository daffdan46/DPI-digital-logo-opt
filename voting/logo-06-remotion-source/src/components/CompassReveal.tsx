import React from 'react';
import {ANNOTATIONS, COLORS, COPY, HIGHLIGHT, TL} from '../config';
import {LOGO} from '../logoData';
import {logoTransform, toCanvas, CX} from '../layout';
import {easeInOut, prog} from '../motion';
import {Eyebrow, Support, Title} from './Typography';

const w = (f: number, r: readonly [number, number]) => prog(f, r[0], r[1] - r[0], easeInOut);

/**
 * Scene 06 "The Compass of Solutions": transisi halus dari sparkle ke compass: diagonal memudar, sumbu horizontal/vertikal tipis
 * melalui titik temu digambar (arah apex kedua bentuk saling menghadap). Panel pembanding (ComparisonGuide) berputar 45° → 0°
 * dan memunculkan lingkaran referensi. Logo TIDAK diputar; tidak ada jarum/lingkaran/penanda arah permanen.
 */
export const CompassReveal: React.FC<{frame: number}> = ({frame}) => {
  const t = w(frame, TL.axes.draw);
  const o = 1 - w(frame, TL.guideOut);
  const [mx, my] = LOGO.geo.meet;
  const [cx, cy] = toCanvas(mx, my);
  void CX;
  return (
    <g>
      {ANNOTATIONS.compass && t > 0 && o > 0 && (
        <g transform={logoTransform(0)} opacity={o}>
          <path d={`M ${mx - 175} ${my} L ${mx + 175} ${my}`} fill="none" stroke={COLORS.grey} strokeWidth={HIGHLIGHT.lineWidth} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - t} />
          <path d={`M ${mx} ${my - 175} L ${mx} ${my + 175}`} fill="none" stroke={COLORS.grey} strokeWidth={HIGHLIGHT.lineWidth} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - t} />
        </g>
      )}
      {void cx}
      <Eyebrow id="s6" text={COPY.s6.eyebrow} frame={frame} inR={TL.s6.eyebrow} outR={TL.s6.out} />
      <Title id="s6" frame={frame} inR={TL.s6.title} outR={TL.s6.out}>
        {COPY.s6.title}
      </Title>
      <Support frame={frame} inR={TL.s6.support} outR={TL.s6.out}>
        {COPY.s6.support}
      </Support>
    </g>
  );
};
