import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('FavoritePokemons.js testcase', () => {
  test(`se é exibido na tela a mensagem No favorite pokemon found,
        se a pessoa não tiver pokémons favoritos.`, () => {
    renderWithRouter(<FavoritePokemons />);

    const noFavorites = screen.getByText(/no favorite pokemon found/i);
    expect(noFavorites).toBeInTheDocument();
  });

  test('se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pokemons/151');
    const favoriteMew = screen.getByRole('checkbox', { id: 'favorite' });
    userEvent.click(favoriteMew);

    history.push('/pokemons/148');
    const favoriteDragonair = screen.getByRole('checkbox', { id: 'favorite' });
    userEvent.click(favoriteDragonair);

    history.push('/favorites');

    const markedAsFavorite = screen.getAllByRole('link', {
      name: /more details/i,
    });
    expect(markedAsFavorite.length).toEqual(2);
  });
});
