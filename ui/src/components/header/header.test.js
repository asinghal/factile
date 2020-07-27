import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import Header from './';

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
