import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import App from '../App';

describe('Testa o componente FavoritePokemons.js', () => {
  test('se é exibido na tela a mensagem não houver Pokemons favoritados.',
    () => {
      renderWithRouter(<App />);
      const favoritesLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
      userEvent.click(favoritesLink);

      const emptyListText = screen.getByText('No favorite pokemon found');
      expect(emptyListText).toBeInTheDocument();
    });
});
