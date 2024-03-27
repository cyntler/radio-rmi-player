import { useEffect, useState } from 'react';
import { audioFade } from '../utils/audioFade';
import { PlayerStatus } from '../models';

export const useAudioStream = (listenUrl: string) => {
  const [audioElement, setAudioElement] = useState<
    HTMLAudioElement | undefined
  >();
  const [status, setStatus] = useState<PlayerStatus>(PlayerStatus.IDLE);

  const createAudioElement = () => {
    const audio = new Audio(`${listenUrl}?now=${Date.now()}`);
    audio.autoplay = false;
    audio.controls = false;
    audio.preload = 'auto';
    audio.crossOrigin = 'anonymous';
    audio.volume = 0;

    setAudioElement(audio);
    return audio;
  };

  const stop = () => {
    if (audioElement) {
      audioElement.pause();
      audioElement.src = '';
      audioElement.load();
      audioElement.remove();

      setAudioElement(undefined);
      setStatus(PlayerStatus.IDLE);
    }
  };

  const play = () => {
    const ref = audioElement ?? createAudioElement();

    ref.play();
    setStatus(PlayerStatus.LOADING);
  };

  useEffect(() => {
    const handler = () => {
      audioFade(audioElement!, 'in');
      setStatus(PlayerStatus.PLAYING);
    };

    audioElement?.addEventListener('canplay', handler);

    return () => {
      audioElement?.removeEventListener('canplay', handler);
    };
  }, [audioElement]);

  return {
    audioElement,
    status,
    stop,
    play,
  };
};
