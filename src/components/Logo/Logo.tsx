import { FunctionComponent } from 'react';

import { useGlobalState } from '../../hooks/useGlobalState';
import { assets } from '../../models';
import { LogoImage, LogoLink } from './Logo.style';

export const Logo: FunctionComponent = () => {
  const [isPlaying] = useGlobalState('isPlaying');

  return (
    <LogoLink href="/">
      <LogoImage src={assets.logo} alt="Radio RMI" isRotation={isPlaying} />
    </LogoLink>
  );
};
