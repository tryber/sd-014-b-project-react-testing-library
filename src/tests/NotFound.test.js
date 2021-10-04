import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa o componente NotFound', () => {
  test('A página contem um heading h2 com o texto \'Page requested not found 😭\'', () => {
    renderWithRouter(<NotFound />);

    const h2 = screen.getByText(/Page requested not found/);

    expect(screen.getByRole('heading', { level: 2 })).toBe(h2);
  });

  test('A página contem uma imagem com o atributo correto', () => {
    renderWithRouter(<NotFound />);

    const image = screen
      .getByAltText('Pikachu crying because the page requested was not found');

    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
