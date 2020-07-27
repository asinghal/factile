import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders logo link', () => {
  const { getAllByText } = render(<App />);
  const linkElements = getAllByText(/Factile/i);
  expect(linkElements[0]).toBeInTheDocument();
});

test('renders help link', () => {
  const { getAllByText } = render(<App />);
  const linkElements = getAllByText(/Help/i);
  expect(linkElements[0]).toBeInTheDocument();
});

test('renders login link', () => {
  const { getAllByText } = render(<App />);
  const linkElements = getAllByText(/Login/i);
  expect(linkElements[0]).toBeInTheDocument();
});
