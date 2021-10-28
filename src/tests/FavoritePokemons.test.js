import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('', () => {
  test('É exibido na tela No favorite pokemon found se não há pokemon favorito', () => {
    renderWithRouter(<FavoritePokemons />);
    const FavoritePokemon = screen.getByText(/No favorite pokemon found/);
    expect(FavoritePokemon).toBeDefined();
  });
});
