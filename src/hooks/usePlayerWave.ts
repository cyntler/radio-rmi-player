import { Wave } from '@foobar404/wave';
import { useContext, useEffect, useRef, useState } from 'react';

import { stationContext } from '../contexts/stationContext';

export const usePlayerWave = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { audioRef, isPlaying } = useContext(stationContext);
  const [wave, setWave] = useState<Wave | undefined>();

  useEffect(() => {
    if (audioRef && canvasRef.current && !wave) {
      canvasRef.current.width = canvasRef.current.offsetWidth;
      canvasRef.current.height = canvasRef.current.offsetHeight;

      const w = new Wave(audioRef, canvasRef.current);
      w.addAnimation(
        new w.animations.Lines({
          count: 30,
          lineColor: '#ffffff',
          lineWidth: 3,
          rounded: true,
        })
      );

      setWave(w);
    }
  }, [audioRef, wave, canvasRef]);

  useEffect(() => {
    if (!isPlaying && wave) {
      wave.clearAnimations();
    }
  }, [isPlaying, wave]);

  return {
    canvasRef,
  };
};
