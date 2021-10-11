import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Teste favoritePokemons', () => {
  it('Favorite pokemon found quando nao tem pokemon favorito', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavoritePokemon = screen.getByText(/No favorite pokemon found/);
    expect(noFavoritePokemon).toBeDefined();
  });
});
