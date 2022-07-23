import { FunctionComponent, useContext } from 'react';

import { stationContext } from '../../contexts/stationContext';
import { assets } from '../../models';
import { LogoImage, LogoLink } from './Logo.style';

export const Logo: FunctionComponent = () => {
  const { isPlaying } = useContext(stationContext);

  return (
    <LogoLink href="/">
      <LogoImage src={assets.logo} alt="Radio RMI" isRotation={isPlaying} />
    </LogoLink>
  );
};
