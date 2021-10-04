import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import App from '../App';

describe('Testa o componente FavoritePokemons.js', () => {
  test('se é exibido na tela a mensagem se a pessoa não tiver pokémons favoritos.',
    () => {
      renderWithRouter(<App />);
      const favoritesLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
      userEvent.click(favoritesLink);

      const emptyListText = screen.getByText('No favorite pokemon found');
      expect(emptyListText).toBeInTheDocument();
    });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const favoritesLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    const moreDetailsLink = screen.getByRole('link', { name: 'More details' });

    userEvent.click(moreDetailsLink);
    const addFavorite = screen.getByRole('checkbox');
    userEvent.click(addFavorite);
    userEvent.click(favoritesLink);

    const pokemonName = screen.getByText('Pikachu');

    expect(pokemonName).toBeInTheDocument();
  });
});
