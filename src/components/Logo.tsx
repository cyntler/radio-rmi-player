import { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';

import { useGlobalState } from '../hooks/useGlobalState';
import { assets } from '../models';
import { logoRotationAnim } from '../utils/animations';

const LogoLink = styled.a`
  position: absolute;
  width: 120px;
  height: 120px;
  top: 20px;
  left: 20px;
  overflow: hidden;
  z-index: 100;

  @media (max-width: 600px) {
    left: 50%;
    margin-left: -45px;
    width: 90px;
    height: 90px;
  }

  @media (max-width: 320px) {
    left: 50%;
    margin-left: -35px;
    width: 70px;
    height: 70px;
  }
`;

const LogoImage = styled.img<{ isRotation: boolean }>`
  border: 0;
  border-radius: 50%;
  display: inline-block;
  width: 100%;
  height: 100%;

  ${({ isRotation }) =>
    isRotation &&
    css`
      animation-name: ${logoRotationAnim};
      animation-duration: 30s;
      animation-iteration-count: infinite;
    `}
`;

export const Logo: FunctionComponent = () => {
  const [isPlaying] = useGlobalState('isPlaying');

  return (
    <LogoLink href="/">
      <LogoImage src={assets.logo} alt="Radio RMI" isRotation={isPlaying} />
    </LogoLink>
  );
};
