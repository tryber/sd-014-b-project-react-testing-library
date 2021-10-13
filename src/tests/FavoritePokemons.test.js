import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <FavoritePokemons.js />', () => {
  test('Testa se é exibido na tela a mensagem `No favorite pokemon found`, se a pessoa não tiver pokémons favoritos.', () => {
    renderWithRouter(<FavoritePokemons />);
    const mensage = screen.getByText('No favorite pokemon found');
    expect(mensage).toBeInTheDocument();
  });
});
