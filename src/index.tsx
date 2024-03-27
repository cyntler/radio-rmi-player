import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import { GlobalStyle } from './components/GlobalStyle';

const root = createRoot(document.querySelector('main')!);
root.render(
  <StrictMode>
    <GlobalStyle />
    <App />
  </StrictMode>,
);
