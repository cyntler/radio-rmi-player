import {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Wave } from '@foobar404/wave';
import Ticker from 'react-ticker';

import {
  PlayerContainer,
  PlayerCover,
  PlayerCoverContainer,
  PlayerDescription,
  PlayerPlayButton,
  PlayerSongName,
  PlayerWaveCanvas,
} from './Player.style';
import { updateTitlePrefix } from '../../utils/updateDocumentTitle';
import { stationContext } from '../../contexts/stationContext';

export const Player: FunctionComponent = () => {
  const { listenUrl, isPlaying, playStation, song, description, audioRef } =
    useContext(stationContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [wave, setWave] = useState<Wave | undefined>();

  const [isMarqueePlay, setIsMarqueePlay] = useState(true);

  const handleMarqueeComplete = useCallback(() => {
    setIsMarqueePlay(false);

    setTimeout(() => {
      setIsMarqueePlay(true);
    }, 1000 * 90);
  }, []);

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
  }, [audioRef, wave]);

  useEffect(() => {
    if (!isPlaying && wave) {
      wave.clearAnimations();
    }
  }, [isPlaying, wave]);

  useEffect(() => {
    if (isPlaying) {
      updateTitlePrefix('Słuchasz');
      return;
    }

    updateTitlePrefix('');
  }, [isPlaying]);

  if (!listenUrl || !song) {
    return null;
  }

  const { artist, title, coverUrl } = song;

  return (
    <PlayerContainer>
      <PlayerCoverContainer>
        <PlayerCover src={coverUrl} />
        {!isPlaying ? (
          <PlayerPlayButton onClick={playStation} />
        ) : (
          <PlayerWaveCanvas ref={canvasRef} />
        )}
      </PlayerCoverContainer>
      <PlayerSongName>
        {artist} - {title}
      </PlayerSongName>
      <PlayerDescription>
        <Ticker
          mode="await"
          speed={10}
          direction="toLeft"
          offset="run-in"
          move={isMarqueePlay}
          // @ts-ignore
          onFinish={handleMarqueeComplete}
        >
          {() => description}
        </Ticker>
      </PlayerDescription>
    </PlayerContainer>
  );
};
