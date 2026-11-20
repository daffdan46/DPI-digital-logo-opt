import React, {useEffect} from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {COLORS, HEIGHT, TL, WIDTH, VO} from './config';
import {loadFonts} from './fonts';
import {Logo06} from './components/Logo06';
import {DualFormReveal} from './components/DualFormReveal';
import {CompatibilityMotion} from './components/CompatibilityMotion';
import {MeetingPointReveal} from './components/MeetingPointReveal';
import {RightMatchReveal, UnifiedContour} from './components/RightMatchReveal';
import {SparkleReveal} from './components/SparkleReveal';
import {CompassReveal} from './components/CompassReveal';
import {ComparisonGuide} from './components/ComparisonGuide';
import {FinalBrandReveal} from './components/FinalBrandReveal';
import {MeaningSynthesis} from './components/MeaningSynthesis';
import {SHIFT_END, logoTransform, shiftAt} from './layout';

// Gating per komponen: overlay tidak dirender di luar jendelanya (frame akhir identik dengan artwork).
const inR = (f: number, a: number, b: number) => f >= a && f <= b;

/** Logo kontinu di tengah pada SATU timeline global; tiap scene hanya menambahkan overlay/tipografi sementara. */
export const TelkomDigitalLogo06: React.FC = () => {
  const frame = useCurrentFrame();
  useEffect(() => {
    loadFonts();
  }, []);
  return (
    <AbsoluteFill style={{backgroundColor: COLORS.white}}>
      {VO.enabled && (
        <Sequence from={VO.offset}>
          <Audio src={staticFile(VO.file)} volume={VO.volume} />
        </Sequence>
      )}
      <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
        <Logo06 frame={frame} shiftX={shiftAt(frame)} />
        {inR(frame, 0, 92) && <DualFormReveal frame={frame} />}
        {inR(frame, 96, 180) && <CompatibilityMotion frame={frame} />}
        {inR(frame, 170, 270) && <MeetingPointReveal frame={frame} />}
        {inR(frame, 270, 452) && <RightMatchReveal frame={frame} />}
        {inR(frame, TL.contour.draw[0], TL.contour.out[1] + 1) && <UnifiedContour frame={frame} />}
        {inR(frame, 428, 502) && <SparkleReveal frame={frame} />}
        {inR(frame, 484, 568) && <CompassReveal frame={frame} />}
        {inR(frame, TL.star.draw[0], TL.guideOut[1] + 1) && <ComparisonGuide frame={frame} />}
        {frame >= TL.shiftStart && <FinalBrandReveal frame={frame} />}
        {frame >= TL.shiftStart && <MeaningSynthesis frame={frame} />}
      </svg>
    </AbsoluteFill>
  );
};

/** QA: artwork asli (staticFile) pada transform final yang sama, untuk diff frame akhir. */
export const QAReference: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: COLORS.white}}>
    <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
      <g transform={logoTransform(SHIFT_END)}>
        <image href={staticFile('logo-06.svg')} x={0} y={0} width={1080} height={1080} />
      </g>
    </svg>
  </AbsoluteFill>
);
