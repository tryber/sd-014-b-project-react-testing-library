import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('se o primeiro link possui o texto "Home"', () => {
  render(<App />);
  const linkText = screen.getByAltText('Home');
  expect(linkText).toBeInTheDocument();
});
