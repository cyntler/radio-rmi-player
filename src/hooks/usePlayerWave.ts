import { Wave } from '@foobar404/wave';
import { useContext, useEffect, useRef, useState } from 'react';

import { stationContext } from '../contexts/stationContext';
import { PlayerStatus } from '../models';

export const usePlayerWave = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { audioElement, status } = useContext(stationContext);
  const [wave, setWave] = useState<Wave | undefined>();

  useEffect(() => {
    if (audioElement && canvasRef.current && !wave) {
      canvasRef.current.width = canvasRef.current.offsetWidth;
      canvasRef.current.height = canvasRef.current.offsetHeight;

      const w = new Wave(audioElement, canvasRef.current);
      w.addAnimation(
        new w.animations.Lines({
          count: 30,
          lineColor: '#ffffff',
          lineWidth: 7,
          bottom: true,
          mirroredX: true,
          frequencyBand: 'lows',
          glow: {
            color: '#000000',
            strength: 3,
          },
        }),
      );

      setWave(w);
    }
  }, [audioElement, wave, canvasRef]);

  useEffect(() => {
    if (status === PlayerStatus.IDLE && wave) {
      wave.clearAnimations();
    }
  }, [status, wave]);

  return {
    canvasRef,
  };
};
