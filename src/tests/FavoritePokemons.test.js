import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../uteis/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

beforeEach(() => {
  renderWithRouter(<FavoritePokemons />);
});

describe('Testa o componente FavoritePokemons', () => {
  test(`se é exibido na tela a mensagem "No favorite pokemon found",
  se a pessoa não tiver pokémons favoritos.`, () => {
    const textNoFavoritePokemons = screen.getByText('No favorite pokemon found');
    expect(textNoFavoritePokemons).toBeInTheDocument();
  });
});
