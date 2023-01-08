import { StrictMode } from 'react';
import { render } from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import App from './App';

const rootElement = document.getElementById('root');
render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
