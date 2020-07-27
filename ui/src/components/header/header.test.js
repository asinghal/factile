import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import Header from './';
import { setToken, removeToken } from '../../authentication';
const jwt = require('jsonwebtoken');

describe('common header tests', () => {

  test('renders brand/ logo', () => {
    const { getByText } = render(
      <Router>
          <Header />
      </Router>);
    const element = getByText('Factile');
    expect(element).toBeInTheDocument();
  });
  
  test('renders Help link', () => {
      const { getByText } = render(
        <Router>
            <Header />
        </Router>);
      const element = getByText('Help');
      expect(element).toBeInTheDocument();
  });

  test('renders Login link', () => {
      const { getByText } = render(
        <Router>
            <Header />
        </Router>);
      const element = getByText('Login');
      expect(element).toBeInTheDocument();
  });    

  test('does not render My Surveys link', () => {
    const { queryByText } = render(
      <Router>
          <Header userLoggedIn={true} />
      </Router>);
    const element = queryByText('My Surveys');
    expect(element).not.toBeInTheDocument();
  });

});

describe('logged in header tests', () => {

  beforeEach(() => {
    setToken(jwt.sign('some user', 'thisisasecret'));
  });

  afterEach(() => {
    removeToken();
  });

  test('renders My Surveys link', () => {
    const { getByText } = render(
      <Router>
          <Header userLoggedIn={true} />
      </Router>);
    const element = getByText('My Surveys');
    expect(element).toBeInTheDocument();
  });

  test('renders New Survey link', () => {
    const { getByText } = render(
      <Router>
          <Header userLoggedIn={true} />
      </Router>);
    const element = getByText('New Survey');
    expect(element).toBeInTheDocument();
  });

  test('renders Address Book link', () => {
    const { getByText } = render(
      <Router>
          <Header userLoggedIn={true} />
      </Router>);
    const element = getByText('Address Book');
    expect(element).toBeInTheDocument();
  });
  
  test('renders Logout link', () => {
      const { getByText } = render(
        <Router>
          <Header userLoggedIn={true} />
        </Router>);
      const element = getByText('Logout');
      expect(element).toBeInTheDocument();
  });  
});
