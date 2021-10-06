import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('03 - Teste o componente <FavoritePokemons.js />', () => {
  test('a) Se No favorite pokemon found aparece quando não há favoritos', () => {
    renderWithRouter(<App />);

    const favoritesLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoritesLink);

    const noFavoritesMessage = screen.getByText('No favorite pokemon found');
    expect(noFavoritesMessage).toBeInTheDocument();
  });

  test('b) Se são exibidos todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const pokemonDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(pokemonDetails);

    const favoriteCheckbox = screen
      .getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(favoriteCheckbox);

    const favoritesLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoritesLink);

    const favoriteCard = screen.getByRole('link', { name: 'More details' });
    expect(favoriteCard).toBeInTheDocument();
  });
});
