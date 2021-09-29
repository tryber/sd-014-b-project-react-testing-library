import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from './services/renderWithRouter';

describe('Testa o componente "<FavoritePokemons.js />"', () => {
  it(`Deveria, ao não haverem pokemons favoritados,
  renderizar um parágrafo com o texto "No favorite pokemon found"`, () => {
    renderWithRouter(<FavoritePokemons />);

    const noPokemonParagraph = screen.getByText('No favorite pokemon found');

    expect(noPokemonParagraph).toBeInTheDocument();
  });
});
