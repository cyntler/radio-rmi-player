import { createContext, FunctionComponent, useState } from 'react';
import { useAudioStream } from '../hooks/useAudioStream';

import { useNowPlaying } from '../hooks/useNowPlaying';
import { StationContext } from '../models';

export const stationContext = createContext({} as StationContext);

const { Provider } = stationContext;

export const StationContextProvider: FunctionComponent = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { listenUrl, song, description } = useNowPlaying();
  const { play: playStation, audioRef } = useAudioStream(
    listenUrl,
    (status) => {
      setIsPlaying(status);
    }
  );

  return (
    <Provider
      value={{ listenUrl, song, description, isPlaying, playStation, audioRef }}
    >
      {children}
    </Provider>
  );
};
