import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('3. Teste o componente <FavoritePokemons.js />', () => {
  test(`se é exibido na tela a mensagem No favorite pokemon found,
  se a pessoa não tiver pokémons favoritos.`, () => {
    renderWithRouter(<FavoritePokemons />);

    const message = screen.getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();
  });

  test('se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<FavoritePokemons />);
  });
});
