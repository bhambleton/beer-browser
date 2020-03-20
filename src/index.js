import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Global, css } from '@emotion/core';

import App from './App';
import store from './redux/store';

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css?family=Overlock:900|Poppins:300|Raleway:300&display=swap');

  body {
    margin: 0;
  }
`;

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <Global styles={globalStyles} />
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
