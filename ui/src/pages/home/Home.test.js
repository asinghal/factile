import React from 'react';
import { render } from '@testing-library/react';
import Home from './';

test('renders hero box', () => {
  const { getByTestId } = render(<Home />);
  const element = getByTestId('hero-box');
  expect(element).toBeInTheDocument();
});

test('renders login box', () => {
    const { getByTestId } = render(<Home />);
    const element = getByTestId('login-form');
    expect(element).toBeInTheDocument();
});

test('renders features list', () => {
    const { getByTestId } = render(<Home />);
    const element = getByTestId('features-1');
    expect(element).toBeInTheDocument();
    expect(element.children[1].innerHTML.indexOf('unlimited surveys at zero cost')).toBeTruthy();
});
