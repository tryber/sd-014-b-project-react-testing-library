import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa o componente FavoritePokemons.js', () => {
  it(`deve exibir "No favorite pokemon found"
    se não existirem pokémon favoritados`, () => {
    render(<FavoritePokemons />);

    const pageTitle = screen.getByRole('heading', {
      level: 2,
      name: 'Favorite pokémons',
    });
    expect(pageTitle).toBeInTheDocument();

    const favoriteNotFound = screen.getByText('No favorite pokemon found');
    expect(favoriteNotFound).toBeInTheDocument();
  });
});
