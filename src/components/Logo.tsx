import { FunctionComponent } from 'react';
import styled from 'styled-components';

import logoImg from '../assets/logo.png';

const LogoLink = styled.a`
  position: relative;
  top: 20px;
  left: 20px;
  overflow: hidden;
`;

const LogoImage = styled.img`
  border: 0;
  border-radius: 50%;
  display: inline-block;
`;

export const Logo: FunctionComponent = () => (
  <LogoLink href="/">
    <LogoImage src={logoImg} alt="Radio RMI" width={120} />
  </LogoLink>
);
