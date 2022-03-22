import { FunctionComponent } from 'react';
import styled from 'styled-components';

import { assets } from '../models';

const BackgroundImage = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-image: url('${assets.background}');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: -1;
`;

const BackgroundOverlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(46, 16, 16, 0.2);
`;

export const Background: FunctionComponent = () => (
  <BackgroundImage>
    <BackgroundOverlay />
  </BackgroundImage>
);
