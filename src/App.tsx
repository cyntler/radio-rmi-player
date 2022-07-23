import { Background } from './components/Background';
import { Logo } from './components/Logo';
import { Player } from './components/Player';
import { StationContextProvider } from './contexts/stationContext';

export const App = () => (
  <StationContextProvider>
    <Background />
    <Logo />
    <Player />
  </StationContextProvider>
);
