import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('', () => {
  it('É exibido na tela No favorite pokemon found quando não há pokemon favorito', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavoritePokemon = screen.getByText(/No favorite pokemon found/);
    expect(noFavoritePokemon).toBeDefined();
  });
});
