import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Header from './components/header/index.js';
import Footer from './components/footer/index.js';
import Routes from './Routes.js';
import { isLoggedIn } from './authentication.js';

import './App.css';
import RespondentFooter from './components/respondent-footer/index.js';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(isLoggedIn());
  const [isRespondentView, setRespondentView] = useState(false);

  return (
    <Router>
      {!isRespondentView &&
        <Header userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />
      }
      {Routes(setUserLoggedIn, setRespondentView)}
      {!isRespondentView &&
        <Footer />
      }

      {isRespondentView &&
        <RespondentFooter />
      }
    </Router>
  );
}

export default App;
