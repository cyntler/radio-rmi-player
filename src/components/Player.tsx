import { FunctionComponent, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Wave } from '@foobar404/wave';

import { useAudioStream } from '../hooks/useAudioStream';
import { useGlobalState } from '../hooks/useGlobalState';
import { useNowPlayingSocket } from '../hooks/useNowPlayingSocket';
import { assets } from '../models';

const PlayerContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

const PlayerCoverContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  margin: 0 auto;
`;

const PlayerCover = styled.img`
  display: inline-block;
  user-select: none;
  -webkit-user-drag: none;
  width: 100%;
  height: 100%;
  box-shadow: 4px 4px 9px 3px rgba(0, 0, 0, 0.25);
`;

const PlayerPlayButton = styled.button`
  position: absolute;
  width: 76px;
  height: 91px;
  background-color: transparent;
  background-image: url('${assets.play}');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 0;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const PlayerSongName = styled.p`
  margin: 20px 0 0 0;
  color: #ffffff;
  font-size: 1rem;
`;

const PlayerWaveCanvas = styled.canvas`
  position: absolute;
  width: 100%;
  height: 50%;
  left: 0;
  bottom: 0;
`;

export const Player: FunctionComponent = () => {
  const { listenUrl, song } = useNowPlayingSocket();
  const [isPlaying] = useGlobalState('isPlaying');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { play, audioRef } = useAudioStream(listenUrl);

  useEffect(() => {
    if (audioRef.current && canvasRef.current) {
      console.log(1);
      const wave = new Wave(audioRef.current, canvasRef.current);

      canvasRef.current.width = canvasRef.current.offsetWidth;
      canvasRef.current.height = canvasRef.current.offsetHeight;

      console.log(canvasRef.current.width, canvasRef.current.height);

      wave.addAnimation(
        new wave.animations.Wave({
          lineWidth: 10,
          lineColor: 'red',
          count: 20,
        })
      );
    }
  }, [audioRef, canvasRef]);

  if (!listenUrl || !song) {
    return null;
  }

  const { artist, title } = song;

  return (
    <PlayerContainer>
      <PlayerCoverContainer>
        <PlayerCover src={song.coverUrl} />
        {!isPlaying ? (
          <PlayerPlayButton onClick={play} />
        ) : (
          <PlayerWaveCanvas ref={canvasRef} />
        )}
      </PlayerCoverContainer>
      <PlayerSongName>
        {artist} - {title}
      </PlayerSongName>
    </PlayerContainer>
  );
};
