import React, { useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './Routes.js';

import TagManager from 'react-gtm-module';

import './App.css';

function App() {
  useEffect(() => {
    if (window.location.href.indexOf('factile.net') !== -1) {
      TagManager.initialize({
        gtmId: 'G-PEJFESXE27'
      });
    }
  }, []);

  return (
    <Router>
      {Routes()}
    </Router>
  );
}

export default App;
