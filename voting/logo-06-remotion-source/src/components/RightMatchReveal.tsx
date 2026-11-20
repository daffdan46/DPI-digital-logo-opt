import React from 'react';
import {ANNOTATIONS, COLORS, COPY, FONT_STACK, HIGHLIGHT, SIDE, TL} from '../config';
import {LOGO} from '../logoData';
import {logoTransform} from '../layout';
import {easeInOut, easyEase, prog} from '../motion';
import {MeetMarker} from './MeetingPointReveal';
import {Support, Title} from './Typography';

const w = (f: number, r: readonly [number, number], e = easeInOut) => prog(f, r[0], r[1] - r[0], e);

/** Kontur gabungan tipis (offset di luar artwork, tidak menutupi geometri). Dipakai Scene 4–6. */
export const UnifiedContour: React.FC<{frame: number}> = ({frame}) => {
  const t = w(frame, TL.contour.draw);
  const o = 1 - w(frame, TL.contour.out);
  if (!ANNOTATIONS.contour || t <= 0 || o <= 0) return null;
  return (
    <g transform={logoTransform(0)} opacity={o}>
      <path d={LOGO.geo.contour} fill="none" stroke={COLORS.grey} strokeWidth={HIGHLIGHT.lineWidth} strokeLinejoin="round" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - t} />
    </g>
  );
};

/**
 * Scene 04 "The Right Match": logo diam; tiga anotasi di kolom kanan (Different Forms / Meeting Point / Unified Composition),
 * masing-masing dengan penekanan di logo (redup bergantian, marker, kontur). Lalu pernyataan dan judul + supporting copy.
 */
export const RightMatchReveal: React.FC<{frame: number}> = ({frame}) => {
  const rowsOut = 1 - w(frame, TL.rowsOut, easyEase);
  return (
    <g>
      {ANNOTATIONS.meetingMarker && <MeetMarker draw={w(frame, TL.ring4.draw)} cross={w(frame, TL.ring4.draw)} opacity={1 - w(frame, TL.ring4.out)} />}
      {ANNOTATIONS.breakdown &&
        COPY.s4.rows.map((r, i) => {
          const t = w(frame, TL.rows[i], easyEase);
          if (t <= 0 || rowsOut <= 0) return null;
          const y = SIDE.rowY[i];
          return (
            <g key={i} opacity={t * rowsOut} transform={`translate(${(1 - t) * 18} 0)`}>
              <line x1={SIDE.x - 46} y1={y - 6} x2={SIDE.x - 14} y2={y - 6} stroke={COLORS.grey} strokeWidth={2} strokeLinecap="round" />
              <text x={SIDE.x} y={y} fontFamily={FONT_STACK} fontSize={18} fontWeight={500} letterSpacing={4} fill={COLORS.grey}>
                {r.label}
              </text>
              {r.lines.map((l, k) => (
                <text key={k} x={SIDE.x} y={y + 38 + k * 34} fontFamily={FONT_STACK} fontSize={28} fontWeight={500} fill={COLORS.ink}>
                  {l}
                </text>
              ))}
            </g>
          );
        })}
      <Title id="s4a" frame={frame} inR={TL.statement} outR={TL.statementOut}>
        {COPY.s4.statement}
      </Title>
      <Title id="s4b" frame={frame} inR={TL.s4.title} outR={TL.s4.out}>
        {COPY.s4.title}
      </Title>
      <Support frame={frame} inR={TL.s4.support} outR={TL.s4.out}>
        {COPY.s4.support}
      </Support>
    </g>
  );
};
