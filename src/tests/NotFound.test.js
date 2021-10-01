import React from 'react';
import { screen, render } from '@testing-library/react';
import { NotFound } from '../components';

describe('4 - Testa o componente NotFound.js', () => {
  it('Verifica mensagem de não encontrado caso o caminho seja inexistente', () => {
    render(<NotFound />);
    const notFound = screen.getByRole('heading', {
      name: /Page requested not found/,
      level: 2,
    });
    expect(notFound).toBeInTheDocument();
    const pokemonGif = screen.getByAltText(/Pikachu crying/);
    expect(pokemonGif).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
