import { Global, ThemeProvider } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { LightTheme } from './design-system';
import GlobalStyles from './design-system/global-styles';
import reportWebVitals from './reportWebVitals';
import Router from './router';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={LightTheme}>
      <Global styles={GlobalStyles} />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
