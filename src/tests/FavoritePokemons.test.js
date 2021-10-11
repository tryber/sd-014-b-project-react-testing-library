import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';

describe('Testa o componente FavoritePokemons', () => {
  test('se é exibido na tela a mensagem No favorite pokemon found, '
  + 'se a pessoa não tiver pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavoriteMessage = screen.getByText(/No favorite pokemon found/i);
    expect(noFavoriteMessage).toBeInTheDocument();
  });
  test('se é exibido todos os cards de pokémons favoritados', () => {
    const pokemons = [{ averageWeight: {}, id: 1, image: '', name: '', type: '' }];
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    const favoritePokemon = screen.getByRole('link', { name: 'More details' });
    expect(favoritePokemon.href).toContain('/pokemons/1');
  });
});
