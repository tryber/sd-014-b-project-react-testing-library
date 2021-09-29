import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test(`Teste se é exibido na tela a mensagem No favorite pokemon found,
    se a pessoa não tiver pokémons favoritos`, () => {
    renderWithRouter(<FavoritePokemons />);
    const pokemonFavoriteTitle = screen.getByRole('heading', {
      level: 2,
      name: 'Favorite pokémons',
    });
    expect(pokemonFavoriteTitle).toBeInTheDocument();

    const notPokemonFavorite = screen.getByText('No favorite pokemon found');
    expect(notPokemonFavorite).toBeInTheDocument();
  });
});
