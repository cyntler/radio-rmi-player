import {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { stationContext } from '../../contexts/stationContext';
import { BackgroundImage, BackgroundOverlay } from './Background.style';
import { useCustomPlaylistCover } from '../../hooks/useCustomPlaylistCover';

export const Background: FunctionComponent = () => {
  const { song, playlist } = useContext(stationContext);
  const [isCoverLoaded, setIsCoverLoaded] = useState(false);
  const customPlaylistCover = useCustomPlaylistCover(playlist);

  const backgroundImage = useMemo(() => {
    if (customPlaylistCover) {
      return customPlaylistCover;
    }

    return isCoverLoaded ? song?.coverUrl : '';
  }, [isCoverLoaded, song?.coverUrl, customPlaylistCover]);

  useEffect(() => {
    setIsCoverLoaded(false);
    if (song?.coverUrl) {
      const img = new Image();
      img.src = song.coverUrl;
      img.onload = () => setIsCoverLoaded(true);
    }
  }, [song]);

  return (
    <BackgroundImage
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : '',
      }}
    >
      <BackgroundOverlay />
    </BackgroundImage>
  );
};
