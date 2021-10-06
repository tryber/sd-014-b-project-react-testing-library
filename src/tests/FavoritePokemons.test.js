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

    const pokemonNames = [];
    const AMOUNT_OF_POKEMONS = 9;

    for (let index = 1; index <= AMOUNT_OF_POKEMONS; index += 1) {
      userEvent.click(screen.getByRole('link', { name: 'More details' }));

      pokemonNames.push(screen.getByTestId('pokemon-name').innerHTML);
      userEvent.click(screen.getByRole('checkbox', { name: 'Pokémon favoritado?' }));

      if (index < AMOUNT_OF_POKEMONS) {
        userEvent.click(screen.getByRole('link', { name: 'Home' }));
        for (let index2 = 1; index2 <= index; index2 += 1) {
          userEvent.click(screen.getByTestId('next-pokemon'));
        }
      }
    }

    userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));

    const amountOfCards = screen.getAllByTestId('pokemon-name');
    expect(amountOfCards.length).toBe(pokemonNames.length);
    pokemonNames.forEach((pokemonName) => {
      const nameParagraph = screen.getByText(pokemonName);
      expect(nameParagraph).toBeInTheDocument();
    });
  });
});
