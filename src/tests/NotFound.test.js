import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Teste do componente NotFound', () => {
  it('deveria conter um <h2> com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    const title = screen.getByText(/Page requested not found/);
    const emoji = screen.getByText(/😭/);
    expect(title).toBeInTheDocument();
    expect(emoji).toBeInTheDocument();
  });

  it('deveria conter uma imagem de um Pikachu muito triste segurando uma bateria', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByAltText('Pikachu crying because the '
    + 'page requested was not found');
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
