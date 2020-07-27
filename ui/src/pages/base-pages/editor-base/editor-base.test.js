import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import EditorBase from './';

test('renders header', () => {
  const { getByTestId } = render(
    <Router>
        <EditorBase />
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
  