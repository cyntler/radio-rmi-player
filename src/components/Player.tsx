import { FunctionComponent } from 'react';
import styled from 'styled-components';

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
  width: 320px;
  height: 320px;
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

const PlayButton = styled.button`
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
  margin: 20px 0;
  color: #ffffff;
  font-size: 50px;
`;

export const Player: FunctionComponent = () => {
  const { listenUrl, song } = useNowPlayingSocket();
  const [isPlaying] = useGlobalState('isPlaying');
  const { play } = useAudioStream(listenUrl);

  if (!listenUrl || !song) {
    return null;
  }

  const { artist, title } = song;

  return (
    <PlayerContainer>
      <PlayerCoverContainer>
        <PlayerCover src={song.coverUrl} />
        {!isPlaying && <PlayButton onClick={play} />}
      </PlayerCoverContainer>
      <PlayerSongName>
        {artist} - {title}
      </PlayerSongName>
    </PlayerContainer>
  );
};
