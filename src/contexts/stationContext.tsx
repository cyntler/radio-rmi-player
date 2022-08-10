import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useState,
} from 'react';
import { useAudioStream } from '../hooks/useAudioStream';

import { useNowPlaying } from '../hooks/useNowPlaying';
import { StationContext } from '../models';

export const stationContext = createContext({} as StationContext);

const { Provider } = stationContext;

export const StationContextProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { listenUrl, description, song, nextSong } = useNowPlaying();
  const { play: playStation, audioRef } = useAudioStream(
    listenUrl,
    (status) => {
      setIsPlaying(status);
    }
  );

  return (
    <Provider
      value={{
        listenUrl,
        song,
        nextSong,
        description,
        isPlaying,
        playStation,
        audioRef,
      }}
    >
      {children}
    </Provider>
  );
};
