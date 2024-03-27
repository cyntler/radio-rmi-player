import Snowfall from 'react-snowfall';
import { Background } from './components/Background';
import { Logo } from './components/Logo';
import { Player } from './components/Player';
import { StationContextProvider } from './contexts/stationContext';
import { useIsChristmasTime } from './hooks/useIsChristmasTime';

export const App = () => {
  const isChristmasTime = useIsChristmasTime();

  return (
    <StationContextProvider>
      {isChristmasTime && <Snowfall snowflakeCount={124} />}
      <Background />
      <Logo />
      <Player />
    </StationContextProvider>
  );
};
