import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './Helpers/RenderRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('A Página de pokémons favoritos:', () => {
  it('deve ser renderizada vazia quando não há nenhum pokémon favorito', () => {
    renderWithRouter(<FavoritePokemons />);

    const titleWithNoFavorites = screen.getByText('No favorite pokemon found');
    expect(titleWithNoFavorites).toBeInTheDocument();
  });
});
