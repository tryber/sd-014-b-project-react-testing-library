import React from 'react';
import { screen } from '@testing-library/react';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa o componente Favorite Pokemons', () => {
  test('se é exibido na tela a mensagem `No favorite pokemon found`', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavorite = screen.getByText('No favorite pokemon found');
    expect(noFavorite).toBeInTheDocument();
  });
  // importa pokemons de data para implementar este teste:
  test('se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    const favoritesCards = screen.getAllByTestId('pokemon-name');
    expect(favoritesCards[0]).toBeInTheDocument();
    expect(favoritesCards[0]).toHaveTextContent('Pikachu');
    expect(favoritesCards[6]).toBeInTheDocument();
    expect(favoritesCards[6]).toHaveTextContent('Rapidash');
  });
});
