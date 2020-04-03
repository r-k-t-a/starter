import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';

const RktaApp = (): JSX.Element => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

document.onreadystatechange = (): void => {
  if (document.readyState === 'complete')
    ReactDOM.render(<RktaApp />, document.getElementById(process.env.CLIENT__APP_CONTAINER));
};

if (module.hot) module.hot.accept();
