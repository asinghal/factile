import React, { useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './Routes.js';

import TagManager from 'react-gtm-module';
import * as Sentry from '@sentry/react';

import './App.css';

const FallbackComponent = () => (<div />);

function App() {
  useEffect(() => {
    if (window.location.href.indexOf('factile.net') !== -1) {
      // Google Tag manager
      TagManager.initialize({
        gtmId: 'G-PEJFESXE27'
      });

      // Sentry
      Sentry.init({dsn: "https://e95e35511dce42e1a36c6e9b70fe0adc@o423748.ingest.sentry.io/5354503"});
    }
  }, []);

  return (
    <Sentry.ErrorBoundary fallback={FallbackComponent}>
      <Router>
        {Routes()}
      </Router>
    </Sentry.ErrorBoundary>
  );
}

export default App;
