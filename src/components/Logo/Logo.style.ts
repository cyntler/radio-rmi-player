import styled, { css } from 'styled-components';

import { logoRotationAnimation } from '../../utils/animations';

export const LogoContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
`;

export const LogoLink = styled.a`
  width: 120px;
  height: 120px;
  overflow: hidden;
  z-index: 100;
  display: block;

  @media (max-width: 600px) {
    width: 90px;
    height: 90px;
  }

  @media (max-width: 320px) {
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

export const SupportButton = styled.a`
  background: #000000;
  padding: 8px 15px;
  font-size: 16px;
  text-transform: uppercase;
  border-radius: 6px;
  border: 0;
  color: #ffffff;
  font-weight: 700;
  display: block;
  text-decoration: none;
  margin-left: 15px;
  letter-spacing: 1px;

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;
