import React from 'react';
import { screen, render } from '@testing-library/react';
import { FavoritePokemons } from '../components';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('se é exibido na tela a mensagem "No favorite pokemon found"', () => {
    render(<FavoritePokemons />);

    const favoriteTitle = screen.getByRole('heading',
      { level: 2, name: 'Favorite pokémons' });
    expect(favoriteTitle).toBeInTheDocument();

    const missingPokemon = screen.getByText('No favorite pokemon found');
    expect(missingPokemon).toBeInTheDocument();
  });
});
