import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente <FavoritePokemons.js />', () => {
  test('Testa se é exibido na tela a mensagem `No favorite pokemon found`, se a pessoa não tiver pokémons favoritos.', () => {
    renderWithRouter(<FavoritePokemons />);
    const mensage = screen.getByText('/No favorite pokemon found/i');
    expect(mensage).toBeInTheDocument();
  });

  test('Testa se é exibido todos os cards de pokémons favoritados', () => {
    const pokemons = [{ id: 1, name: '', type: '', averageWeight: {}, image: '' }];
    renderWithRouter(<FavoritePokemons pokemons={ pokemons} />);
    const favorite = screen.getByRole('link', { name: 'More details' });
    expect(favorite.href).toContain('/pokemons/1');
  });
});
