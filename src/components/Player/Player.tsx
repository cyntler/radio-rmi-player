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
  LoadingIcon,
  PlayIcon,
  CornerIconContainer,
} from './Player.style';
import { updateTitlePrefix } from '../../utils/updateDocumentTitle';
import { stationContext } from '../../contexts/stationContext';
import { usePlayerWave } from '../../hooks/usePlayerWave';
import { PlayerDescription } from '../PlayerDescription';
import { usePlayerSongDetails } from '../../hooks/usePlayerSongDetails';
import { useCustomPlaylistCover } from '../../hooks/useCustomPlaylistCover';
import { PlayerStatus } from '../../models';

export const Player: FunctionComponent = () => {
  const { canvasRef } = usePlayerWave();
  const { title, heading, isNextSongShown } = usePlayerSongDetails();
  const { listenUrl, status, playStation, song, nextSong, playlist } =
    useContext(stationContext);

  const customPlaylistCover = useCustomPlaylistCover(playlist);

  useEffect(() => {
    if (status !== PlayerStatus.IDLE) {
      updateTitlePrefix('Słuchasz');
      return;
    }

    updateTitlePrefix('');
  }, [status]);

  if (!listenUrl || !song) {
    return null;
  }

  return (
    <PlayerContainer>
      <PlayerCoverContainer
        onContextMenu={
          import.meta.env.PROD ? (e) => e.preventDefault() : undefined
        }
      >
        <PlayerCoverInner
          $isNextSongCoverActive={!customPlaylistCover && isNextSongShown}
        >
          <PlayerCoverImage src={customPlaylistCover ?? song.coverUrl} />
          {!customPlaylistCover && nextSong && (
            <PlayerCoverImage src={nextSong.coverUrl} />
          )}
        </PlayerCoverInner>
        {status === PlayerStatus.IDLE ? (
          <PlayerPlayButton onClick={playStation} />
        ) : (
          <>
            <CornerIconContainer>
              <LoadingIcon
                visible={status === PlayerStatus.LOADING}
                height="0.5rem"
                width="0.5rem"
                colors={['#ffffff', '#ffffff', '#ffffff']}
                ariaLabel="Wczytywanie"
              />
              <PlayIcon
                visible={status === PlayerStatus.PLAYING}
                height="0.4rem"
                width="0.4rem"
                color="#ffffff"
                ariaLabel="Odtwarzanie"
              />
            </CornerIconContainer>
            <PlayerWaveCanvas ref={canvasRef} $isVisible={!isNextSongShown} />
          </>
        )}
      </PlayerCoverContainer>
      <PlayerHeadingText>{heading}</PlayerHeadingText>
      <PlayerSongName>{title}</PlayerSongName>
      <PlayerDescription />
    </PlayerContainer>
  );
};
