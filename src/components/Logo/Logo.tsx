import { FunctionComponent, useContext } from 'react';

import { version } from '../../../package.json';
import { stationContext } from '../../contexts/stationContext';
import { PlayerStatus, assets } from '../../models';
import {
  LogoContainer,
  LogoImage,
  LogoLink,
  SupportButton,
  SupportInfoContainer,
} from './Logo.style';

export const Logo: FunctionComponent = () => {
  const { status } = useContext(stationContext);

  return (
    <LogoContainer>
      <LogoLink href="/">
        <LogoImage
          src={assets.logo}
          alt="Radio RMI"
          $isRotation={status === PlayerStatus.PLAYING}
        />
      </LogoLink>
      <SupportInfoContainer>
        <SupportButton
          href="https://zrzutka.radiormi.pl/wplac"
          target="_blank"
          rel="noreferrer"
        >
          Wspomóż nas
        </SupportButton>
        <small>v{version}</small>
      </SupportInfoContainer>
    </LogoContainer>
  );
};
