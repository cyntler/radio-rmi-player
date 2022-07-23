import { useState } from 'react';

export const useAudioStream = (
  listenUrl: string,
  onPlay: (status: boolean) => void
) => {
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | undefined>();

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
      onPlay(false);
    }
  };

  const play = () => {
    const ref = audioRef ?? createAudioElement();

    ref.play();
    onPlay(true);
  };

  return {
    audioRef,
    stop,
    play,
  };
};
