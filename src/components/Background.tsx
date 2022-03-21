import { FunctionComponent } from 'react';
import styled from 'styled-components';

const BackgroundImage = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-image: url('src/assets/background.jpg');
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  z-index: -1;
`;

const BackgroundOverlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const Background: FunctionComponent = () => (
  <BackgroundImage>
    <BackgroundOverlay />
  </BackgroundImage>
);
