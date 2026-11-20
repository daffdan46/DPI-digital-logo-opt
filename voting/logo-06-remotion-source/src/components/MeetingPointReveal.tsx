import React from 'react';
import {ANNOTATIONS, COLORS, COPY, TL} from '../config';
import {LOGO} from '../logoData';
import {toCanvas} from '../layout';
import {easeInOut, prog} from '../motion';
import {Support, Title} from './Typography';

const w = (f: number, r: readonly [number, number]) => prog(f, r[0], r[1] - r[0], easeInOut);
const RING_R = 20;

/** Marker titik temu (ring tipis + crosshair pendek): dipakai di Scene 3 dan ulang di Scene 4 ("Meeting Point"). */
export const MeetMarker: React.FC<{draw: number; cross: number; opacity: number}> = ({draw, cross, opacity}) => {
  const [x, y] = toCanvas(LOGO.geo.meet[0], LOGO.geo.meet[1]);
  if (opacity <= 0 || draw <= 0) return null;
  const ticks: [number, number, number, number][] = [
    [x - RING_R - 26, y, x - RING_R - 8, y],
    [x + RING_R + 8, y, x + RING_R + 26, y],
    [x, y - RING_R - 26, x, y - RING_R - 8],
    [x, y + RING_R + 8, x, y + RING_R + 26],
  ];
  return (
    <g opacity={opacity} fill="none" strokeLinecap="round">
      {[
        {c: COLORS.white, sw: 5.5},
        {c: COLORS.ink, sw: 2},
      ].map((st, k) => (
        <g key={k} stroke={st.c} strokeWidth={st.sw}>
          <circle cx={x} cy={y} r={RING_R} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} transform={`rotate(-90 ${x} ${y})`} />
          {k === 1 &&
            ticks.map((t, i) => <line key={i} x1={t[0]} y1={t[1]} x2={t[0] + (t[2] - t[0]) * cross} y2={t[1] + (t[3] - t[1]) * cross} />)}
        </g>
      ))}
    </g>
  );
};

/** Scene 03 "The Meeting Point": bentuk tiba di posisi final (timeline global); marker titik temu muncul saat hubungan terbaca. */
export const MeetingPointReveal: React.FC<{frame: number}> = ({frame}) => (
  <g>
    {ANNOTATIONS.meetingMarker && <MeetMarker draw={w(frame, TL.ring.draw)} cross={w(frame, TL.ring.cross)} opacity={1 - w(frame, TL.ring.out)} />}
    <Title id="s3" frame={frame} inR={TL.s3.title} outR={TL.s3.out}>
      {COPY.s3.title}
    </Title>
    <Support frame={frame} inR={TL.s3.support} outR={TL.s3.out}>
      {COPY.s3.support}
    </Support>
  </g>
);
