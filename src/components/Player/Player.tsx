import { FunctionComponent, useContext, useEffect } from 'react';

import {
  PlayerContainer,
  PlayerCoverImage,
  PlayerCoverContainer,
  PlayerCoverInner,
  PlayerHeadingText,
  PlayerPlayButton,
  PlayerSongName,
  PlayerWaveCanvas,
} from './Player.style';
import { updateTitlePrefix } from '../../utils/updateDocumentTitle';
import { stationContext } from '../../contexts/stationContext';
import { usePlayerWave } from '../../hooks/usePlayerWave';
import { PlayerDescription } from '../PlayerDescription';
import { usePlayerSongDetails } from '../../hooks/usePlayerSongDetails';
import { useCustomPlaylistCover } from '../../hooks/useCustomPlaylistCover';

export const Player: FunctionComponent = () => {
  const { canvasRef } = usePlayerWave();
  const { title, heading, isNextSongShown } = usePlayerSongDetails();
  const { listenUrl, isPlaying, playStation, song, nextSong, playlist } =
    useContext(stationContext);

  const customPlaylistCover = useCustomPlaylistCover(playlist);

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

  return (
    <PlayerContainer>
      <PlayerCoverContainer>
        <PlayerCoverInner
          isNextSongCoverActive={!customPlaylistCover && isNextSongShown}
        >
          <PlayerCoverImage src={customPlaylistCover ?? song.coverUrl} />
          {!customPlaylistCover && nextSong && (
            <PlayerCoverImage src={nextSong.coverUrl} />
          )}
        </PlayerCoverInner>
        {!isPlaying ? (
          <PlayerPlayButton onClick={playStation} />
        ) : (
          <PlayerWaveCanvas ref={canvasRef} isVisible={!isNextSongShown} />
        )}
      </PlayerCoverContainer>
      <PlayerHeadingText>{heading}</PlayerHeadingText>
      <PlayerSongName>{title}</PlayerSongName>
      <PlayerDescription />
    </PlayerContainer>
  );
};
