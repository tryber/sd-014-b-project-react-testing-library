import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';

describe('Testa o componente <FavoritePokemons.js />', () => {
  test('se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);

    const favorite = screen.getByText(/No favorite pokemon found/i);
    expect(favorite).toBeInTheDocument();
  });
});
