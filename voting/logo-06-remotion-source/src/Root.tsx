import React from 'react';
import {Composition} from 'remotion';
import {QAReference, TelkomDigitalLogo06} from './TelkomDigitalLogo06';
import {DURATION, FPS, HEIGHT, WIDTH} from './config';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="TelkomDigitalLogo06" component={TelkomDigitalLogo06} durationInFrames={DURATION} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Composition id="QAReference" component={QAReference} durationInFrames={1} fps={FPS} width={WIDTH} height={HEIGHT} />
  </>
);
