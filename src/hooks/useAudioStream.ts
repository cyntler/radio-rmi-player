import { useState } from 'react';

import { useGlobalState } from './useGlobalState';

export const useAudioStream = (listenUrl: string) => {
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | undefined>();
  const [, setIsPlaying] = useGlobalState('isPlaying');

  const createAudioElement = () => {
    const audio = new Audio(`${listenUrl}?now=${Date.now()}`);
    audio.autoplay = false;
    audio.controls = false;
    audio.preload = 'auto';
    audio.crossOrigin = 'anonymous';

    setAudioRef(audio);
    return audio;
  };

  const stop = () => {
    if (audioRef) {
      audioRef.pause();
      audioRef.src = '';
      audioRef.load();
      audioRef.remove();

      setAudioRef(undefined);
      setIsPlaying(false);
    }
  };

  const play = () => {
    const ref = audioRef ?? createAudioElement();

    ref.play();
    setIsPlaying(true);
  };

  return {
    audioRef,
    stop,
    play,
  };
};
