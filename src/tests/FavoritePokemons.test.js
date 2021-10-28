import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('3. Testes do FavoritePokemons.js', () => {
  it(`Se exibe na tela a mensagem "No favorite pokemon found",
    caso a pessoa não tenha pokémons favoritos`, () => {
    render(<FavoritePokemons />);

    const notFoundFavorites = screen.getByText('No favorite pokemon found');
    expect(notFoundFavorites).toBeInTheDocument();
  });
  it('Se exibe os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);

    const favoriteCheckbox = screen.getByRole('checkbox',
      { name: 'Pokémon favoritado?' });
    userEvent.click(favoriteCheckbox);

    const favoritePokemonsLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoritePokemonsLink);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
  });
});
