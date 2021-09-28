import React from 'react';
import { screen } from '@testing-library/react';
import renderRouter from './renderRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste o componente <FavoritePokemons.js />', () => {
  beforeEach(() => {
    renderRouter(<FavoritePokemons />);
  });
  test('Teste se é exibido na tela a mensagem', () => {
    expect(screen.getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName).toBeInTheDocument();
  });
});
