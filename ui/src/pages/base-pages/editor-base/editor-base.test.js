import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import EditorBase from './';
import { setToken } from '../../../authentication';
const jwt = require('jsonwebtoken');

test('renders header', () => {
  const { getByTestId } = render(
    <Router>
        <EditorBase />
    </Router>);
  const element = getByTestId('header');
  expect(element).toBeInTheDocument();
});

test('renders header when secure flag is false', () => {
  const { getByTestId } = render(
    <Router>
        <EditorBase secure="false" />
    </Router>);
  const element = getByTestId('header');
  expect(element).toBeInTheDocument();
});

test('renders footer', () => {
    const { getByTestId } = render(
      <Router>
          <EditorBase />
      </Router>);
    const element = getByTestId('footer');
    expect(element).toBeInTheDocument();
});

test('does not render when secure page and user not logged in', () => {
  const { queryByTestId } = render(
    <Router>
        <EditorBase secure="true" />
    </Router>);
  const element = queryByTestId('header');
  expect(element).toBeNull();
});

test('renders when secure page and user is logged in', () => {
  setToken(jwt.sign('some user', 'thisisasecret'));
  const { queryByTestId } = render(
    <Router>
        <EditorBase secure="true" />
    </Router>);
  const element = queryByTestId('header');
  expect(element).toBeInTheDocument();
});
