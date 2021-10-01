import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokémons from '../components/FavoritePokemons';
import renderWithRouter from './utils/renderWithRouter';
import pokemons from '../data';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test(`Se é exibido na tela a mensagem No favorite pokemon found, se a 
  pessoa não tiver pokémons favoritos. `, () => {
    renderWithRouter(<FavoritePokémons />);
    const noFavoritePokemon = screen.getByText(/No favorite pokemon found/i);
    expect(noFavoritePokemon).toBeInTheDocument();
  });
  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<FavoritePokémons pokemons={ pokemons } />);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });
});
