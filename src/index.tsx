import { StrictMode } from 'react';
import { render } from 'react-dom';

import { App } from './App';
import { GlobalStyle } from './components/GlobalStyle';

render(
  <StrictMode>
    <GlobalStyle />
    <App />
  </StrictMode>,
  document.querySelector('main')
);
