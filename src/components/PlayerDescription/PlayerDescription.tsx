import { FunctionComponent, useCallback, useContext, useState } from 'react';
import Ticker from 'react-ticker';
import { RenderWithReact17 } from 'render-with-react17';

import { stationContext } from '../../contexts/stationContext';
import { PlayerDescriptionContainer } from './PlayerDescription.style';

export const PlayerDescription: FunctionComponent = () => {
  const { description } = useContext(stationContext);
  const [isMarqueePlay, setIsMarqueePlay] = useState(true);

  const handleMarqueeComplete = useCallback(() => {
    setIsMarqueePlay(false);

    setTimeout(() => {
      setIsMarqueePlay(true);
    }, 1000 * 90);
  }, []);

  return (
    <PlayerDescriptionContainer>
      <RenderWithReact17>
        <Ticker
          mode="await"
          speed={10}
          direction="toLeft"
          offset="run-in"
          move={isMarqueePlay}
          onFinish={handleMarqueeComplete}
        >
          {() => <p>{description}</p>}
        </Ticker>
      </RenderWithReact17>
    </PlayerDescriptionContainer>
  );
};
