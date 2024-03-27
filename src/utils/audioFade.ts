export const audioFade = (audio: HTMLAudioElement, inOut: 'in' | 'out') => {
  let fadeAudio: NodeJS.Timeout;

  fadeAudio = setInterval(() => {
    try {
      if (inOut === 'in') {
        audio.volume += 0.2;
      } else {
        audio.volume -= 0.2;
      }
    } catch (e) {
      audio.volume = inOut === 'in' ? 1.0 : 0.0;
      clearInterval(fadeAudio);
    }

    if (
      (inOut === 'in' && audio.volume >= 1.0) ||
      (inOut === 'out' && audio.volume <= 0.0)
    ) {
      clearInterval(fadeAudio);
    }
  }, 300);
};
