import React from 'react';
import {ANNOTATIONS, COLORS, COPY, HIGHLIGHT, TL} from '../config';
import {LOGO} from '../logoData';
import {logoTransform} from '../layout';
import {easeInOut, prog} from '../motion';
import {Eyebrow, Support, Title} from './Typography';

const w = (f: number, r: readonly [number, number]) => prog(f, r[0], r[1] - r[0], easeInOut);

/**
 * Scene 05 "The Spark of Insight": kontur gabungan (UnifiedContour) tetap tampil; dua diagonal tipis menghubungkan empat ujung
 * siluet dan berpotongan tepat di titik temu (selisih < 1 unit); titik kecil menandai empat ujung. Bintang pembanding ada di
 * panel kanan (ComparisonGuide). Tidak ada bintang pada logo; bentuk tidak dideformasi.
 */
export const SparkleReveal: React.FC<{frame: number}> = ({frame}) => {
  const t = w(frame, TL.diag.draw);
  const o = 1 - w(frame, TL.diag.out);
  const dots = w(frame, TL.dots.draw);
  const [tl, bl, tr, br] = LOGO.geo.tips;
  const line = (a: readonly number[], b: readonly number[]) => `M ${a[0]} ${a[1]} L ${b[0]} ${b[1]}`;
  return (
    <g>
      {ANNOTATIONS.sparkle && t > 0 && o > 0 && (
        <g transform={logoTransform(0)} opacity={o}>
          {[line(tl, br), line(bl, tr)].map((d, i) => (
            <path key={i} d={d} fill="none" stroke={COLORS.grey} strokeWidth={HIGHLIGHT.lineWidth} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - Math.min(1, Math.max(0, t * 1.4 - i * 0.2))} />
          ))}
          {[tl, bl, tr, br].map((p, i) => (
            <circle key={i} cx={p[0]} cy={p[1]} r={2.2 * dots} fill={COLORS.ink} />
          ))}
        </g>
      )}
      <Eyebrow id="s5" text={COPY.s5.eyebrow} frame={frame} inR={TL.s5.eyebrow} outR={TL.s5.out} />
      <Title id="s5" frame={frame} inR={TL.s5.title} outR={TL.s5.out}>
        {COPY.s5.title}
      </Title>
      <Support frame={frame} inR={TL.s5.support} outR={TL.s5.out}>
        {COPY.s5.support}
      </Support>
    </g>
  );
};
