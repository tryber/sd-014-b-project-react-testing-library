import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente About', () => {
  it('deveria apresentar o texto `About Pokédex` no título', () => {
    renderWithRouter(<FavoritePokemons />);
    const pokemonsNotFound = screen.getByText('No favorite pokemon found');
    expect(pokemonsNotFound).toBeInTheDocument();
  });
});
