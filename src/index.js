import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/styles/index.css';
import HomePage from 'pages/HomePage';
import HomePageFunctional from 'pages/HomePageFunctional';
import Navbar from 'components/Navbar';
import reportWebVitals from 'reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <Navbar />
    <HomePageFunctional />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
