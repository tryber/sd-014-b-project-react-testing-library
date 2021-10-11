import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it(`Teste se é exibido na tela a mensagem "No favorite pokemon found",
    se a pessoa não tiver pokémons favoritos.`,
  () => {
    renderWithRouter(<FavoritePokemons />);
    const msgNoPokemon = screen.getByText('No favorite pokemon found');
    expect(msgNoPokemon).toBeInTheDocument();
  });
});
