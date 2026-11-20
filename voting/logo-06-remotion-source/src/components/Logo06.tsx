import React from 'react';
import {LOGO} from '../logoData';
import {formLevels, formXF, xfString} from '../choreography';
import {logoTransform} from '../layout';

/** Gradient asli artwork (userSpaceOnUse: ikut bergerak bersama bentuk). Stop dari artwork: #ff0001 → #bc0000. */
const Defs: React.FC = () => (
  <defs>
    {LOGO.forms.flatMap((f) =>
      f.faces.map((fc, i) => (
        <linearGradient key={`${f.id}-${i}`} id={`g06-${f.id}-${i}`} gradientUnits="userSpaceOnUse" x1={fc.grad.x1} y1={fc.grad.y1} x2={fc.grad.x2} y2={fc.grad.y2}>
          <stop offset="0" stopColor="#ff0001" />
          <stop offset="1" stopColor="#bc0000" />
        </linearGradient>
      )),
    )}
  </defs>
);

/** Satu bentuk asli = dua face (path & gradient apa adanya). Tidak pernah dideformasi: hanya translate + skala seragam kecil. */
export const Form: React.FC<{id: string; frame: number}> = ({id, frame}) => {
  const f = LOGO.forms.find((x) => x.id === id)!;
  const xf = formXF(id, frame);
  const o = xf.opacity * formLevels(frame)[id];
  return (
    <g opacity={o >= 1 ? undefined : o} transform={xfString(id, xf)}>
      {f.faces.map((fc, i) => (
        <path key={i} d={fc.d} fill={`url(#g06-${f.id}-${i})`} />
      ))}
    </g>
  );
};

/** Logo 06 = dua bentuk asli. Kondisi akhir dirender utuh, identik dengan artwork. */
export const Logo06: React.FC<{frame: number; shiftX: number}> = ({frame, shiftX}) => (
  <g transform={logoTransform(shiftX)}>
    <Defs />
    {LOGO.forms.map((f) => (
      <Form key={f.id} id={f.id} frame={frame} />
    ))}
  </g>
);
