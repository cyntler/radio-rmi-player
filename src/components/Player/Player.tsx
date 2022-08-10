import { FunctionComponent, useContext, useEffect } from 'react';
import { useWindowBlurChangeTitle } from 'use-window-blur-change-title';

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

export const Player: FunctionComponent = () => {
  const { canvasRef } = usePlayerWave();
  const { title, heading, isNextSongShown } = usePlayerSongDetails();
  const { listenUrl, isPlaying, playStation, song, nextSong } =
    useContext(stationContext);

  useWindowBlurChangeTitle(song?.title ? song.title : '');

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

  const { coverUrl } = song;

  return (
    <PlayerContainer>
      <PlayerCoverContainer>
        <PlayerCoverInner isNextSongCoverActive={isNextSongShown}>
          <PlayerCoverImage src={coverUrl} />
          {nextSong && <PlayerCoverImage src={nextSong.coverUrl} />}
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
