import { FunctionComponent, useContext, useEffect, useState } from 'react';

import { stationContext } from '../../contexts/stationContext';
import { BackgroundImage, BackgroundOverlay } from './Background.style';

export const Background: FunctionComponent = () => {
  const { song } = useContext(stationContext);
  const [isCoverLoaded, setIsCoverLoaded] = useState(false);

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
      style={{ backgroundImage: isCoverLoaded ? `url(${song?.coverUrl})` : '' }}
    >
      <BackgroundOverlay />
    </BackgroundImage>
  );
};
