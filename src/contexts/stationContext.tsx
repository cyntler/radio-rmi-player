import { createContext, FunctionComponent, PropsWithChildren } from 'react';
import { useAudioStream } from '../hooks/useAudioStream';

import { useNowPlaying } from '../hooks/useNowPlaying';
import { StationContext } from '../models';

export const stationContext = createContext({} as StationContext);

const { Provider } = stationContext;

export const StationContextProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { listenUrl, description, song, nextSong, playlist } = useNowPlaying();
  const { play: playStation, audioElement, status } = useAudioStream(listenUrl);

  return (
    <Provider
      value={{
        listenUrl,
        song,
        nextSong,
        description,
        playlist,
        status,
        playStation,
        audioElement,
      }}
    >
      {children}
    </Provider>
  );
};
