import React from 'react';
import { screen, render } from '@testing-library/react';
import { NotFound } from '../components';

describe('4. Testes do NotFound.js', () => {
  it('Se contém um h2 com o texto "Page requested not found"', () => {
    render(<NotFound />);
    const notFound = screen.getByRole('heading', { name: /Page requested not found/ });
    expect(notFound).toBeInTheDocument();
  });
  it('Se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    render(<NotFound />);
    const pokemonGif = screen.getByAltText(/Pikachu crying/);
    expect(pokemonGif).toHaveAttribute('src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
