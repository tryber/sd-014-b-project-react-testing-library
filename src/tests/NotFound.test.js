import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helper/renderWithRouter';
import NotFound from '../components/NotFound';

test('Testa se a tag <h2> é renderizada corretamente', () => {
  renderWithRouter(<NotFound />);
  const title = screen.getByRole('heading', { level: 2 });
  expect(title).toBeInTheDocument();
  expect(title).toHaveTextContent('Page requested not found 😭');
});

test('Testa se a imagem é renderizada', () => {
  renderWithRouter(<NotFound />);
  const image = screen
    .getByAltText('Pikachu crying because the page requested was not found');
  expect(image).toBeInTheDocument();
  expect(image.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
