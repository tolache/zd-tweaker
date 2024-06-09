import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders pop-up header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Zendesk Tweaker/i);
  expect(headerElement).toBeInTheDocument();
});
