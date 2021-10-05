import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente <FavoritePokemons.js>', () => {
  test('Verifica se há uma mensagem se a pessoa não tiver pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const msg = screen.getByText(/No favorite pokemon found/);
    expect(msg).toBeInTheDocument();
  });
});
