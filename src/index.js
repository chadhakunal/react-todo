import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/styles/index.css';
import HomePage from 'pages/home';
import Navbar from 'components/navbar';
import reportWebVitals from 'reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <Navbar />
    <HomePage />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
