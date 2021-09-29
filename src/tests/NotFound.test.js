import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Testa o Componente "NotFound"', () => {
  test(`se página contém um heading "h2" com o texto 
  "Page requested not found 😭"`, () => {
    renderWithRouter(<NotFound />);
    const h2 = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(h2).toBeInTheDocument();
  });

  test(`se página mostra a imagem 
  "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"`, () => {
    renderWithRouter(<NotFound />);
    const img = screen.getAllByRole('img');
    expect(img[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
