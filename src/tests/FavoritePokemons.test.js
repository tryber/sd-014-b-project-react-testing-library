import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

describe('exibe a mensagem "No favorite pokemon found" ou pokemons favoritos', () => {
  it('deveria exibir o texto "No favorite pokemon found"', () => {
    render(<FavoritePokemons />);
    const textInThePage = screen.getByText(/No favorite pokemon found/i);
    expect(textInThePage).toBeInTheDocument();
  });
});
