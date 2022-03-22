import { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';

import { useGlobalState } from '../hooks/useGlobalState';
import { assets } from '../models';
import { logoRotationAnim } from '../utils/animations';

const LogoLink = styled.a`
  position: absolute;
  top: 20px;
  left: 20px;
  overflow: hidden;
`;

const LogoImage = styled.img<{ isRotation: boolean }>`
  border: 0;
  border-radius: 50%;
  display: inline-block;
  ${({ isRotation }) =>
    isRotation &&
    css`
      animation-name: ${logoRotationAnim};
      animation-duration: 60s;
      animation-iteration-count: infinite;
    `}
`;

export const Logo: FunctionComponent = () => {
  const [isPlaying] = useGlobalState('isPlaying');

  return (
    <LogoLink href="/">
      <LogoImage
        src={assets.logo}
        alt="Radio RMI"
        width={120}
        isRotation={isPlaying}
      />
    </LogoLink>
  );
};
