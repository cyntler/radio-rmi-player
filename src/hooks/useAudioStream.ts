import { useRef } from 'react';

import { useGlobalState } from './useGlobalState';

export const useAudioStream = (listenUrl: string) => {
  const audioRef = useRef<HTMLAudioElement | undefined>();
  const [isPlaying, setIsPlaying] = useGlobalState('isPlaying');

  const createAudioElement = () => {
    audioRef.current = new Audio(`${listenUrl}?now=${Date.now()}`);
    audioRef.current.autoplay = false;
    audioRef.current.controls = false;
    audioRef.current.preload = 'auto';

    return audioRef.current;
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current.load();
      audioRef.current.remove();
      audioRef.current = undefined;

      setIsPlaying(false);
    }
  };

  const play = () => {
    const ref = audioRef.current ?? createAudioElement();

    ref.play();
    setIsPlaying(true);
  };

  return {
    audioRef,
    isPlaying,
    stop,
    play,
  };
};
