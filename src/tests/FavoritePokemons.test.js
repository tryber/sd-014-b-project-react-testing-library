import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter ';

describe('Testando o componente "FavoritePokemons.js"', () => {
  test('Verificar se "FavoritePokemons.js" renderiza sem pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');

    const noFavoritePokemonText = screen.getByText(/No favorite/);
    expect(noFavoritePokemonText).toBeInTheDocument();
    expect(noFavoritePokemonText).toHaveTextContent('No favorite pokemon found');
  });

  test('Verificar se "FavoritePokemons.js" renderiza os pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const pokemonCardLinkDetails = screen.getByRole('link', { name: 'More details' });

    userEvent.click(pokemonCardLinkDetails);
    const checkbox = screen.getByRole('checkbox');

    userEvent.click(checkbox);
    const favoritePokemonsLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoritePokemonsLink);
    const pokemonCardLinkDetails2 = screen.getByText(/Average weight/);
    expect(pokemonCardLinkDetails2).toBeInTheDocument();
  });
});
