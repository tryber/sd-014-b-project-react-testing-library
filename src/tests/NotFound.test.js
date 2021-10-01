import { render, screen } from '@testing-library/react';
import React from 'react';
import NotFound from '../components/NotFound';

test('Se a página possui um h2 "Page requested not found"', () => {
  render(<NotFound />);
  const title = screen.getByRole('heading', {
    name: /Page requested not found/i,
    level: 2,
  });

  expect(title).toBeInTheDocument();
});

test('Se a página contem um gif', () => {
  render(<NotFound />);
  const path = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const text1 = 'Pikachu crying because the';
  const text2 = 'page requested was not found';
  const img = screen.getByAltText(`${text1} ${text2}`);

  expect(img.src).toBe(path);
});
