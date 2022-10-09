import { FunctionComponent, useContext } from 'react';

import { stationContext } from '../../contexts/stationContext';
import { assets } from '../../models';
import {
  LogoContainer,
  LogoImage,
  LogoLink,
  SupportButton,
} from './Logo.style';

export const Logo: FunctionComponent = () => {
  const { isPlaying } = useContext(stationContext);

  return (
    <LogoContainer>
      <LogoLink href="/">
        <LogoImage src={assets.logo} alt="Radio RMI" isRotation={isPlaying} />
      </LogoLink>
      <SupportButton
        href="https://zrzutka.radiormi.pl/wplac"
        target="_blank"
        rel="noreferrer"
      >
        Wspomóż nas
      </SupportButton>
    </LogoContainer>
  );
};
