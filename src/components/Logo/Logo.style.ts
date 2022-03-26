import styled, { css } from 'styled-components';

import { logoRotationAnimation } from '../../utils/animations';

export const LogoLink = styled.a`
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

export const LogoImage = styled.img<{ isRotation: boolean }>`
  border: 0;
  border-radius: 50%;
  display: inline-block;
  width: 100%;
  height: 100%;

  ${({ isRotation }) =>
    isRotation &&
    css`
      animation-name: ${logoRotationAnimation};
      animation-duration: 30s;
      animation-iteration-count: infinite;
    `}
`;
