import { FunctionComponent } from 'react';

import { BackgroundImage, BackgroundOverlay } from './Background.style';

export const Background: FunctionComponent = () => (
  <BackgroundImage>
    <BackgroundOverlay />
  </BackgroundImage>
);
