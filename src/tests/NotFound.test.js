import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente NotFound', () => {
  test('se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<NotFound />);
    const textNotFound = screen.getByText(/Page requested not found/i);
    expect(textNotFound).toBeInTheDocument();
  });

  test(' se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);
    const img = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
