import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Header from './components/header/index.js';
import Footer from './components/footer/index.js';
import Routes from './Routes.js';

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      {Routes()}
      <Footer />
    </Router>
  );
}

export default App;
