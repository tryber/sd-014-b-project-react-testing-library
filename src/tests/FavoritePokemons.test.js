import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('if favorite pokémons works', () => {
  test('if the text `No favorite pokemon found`', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const favoritesLink = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    userEvent.click(favoritesLink);
    const emptyFavoriteText = screen.getByText('No favorite pokemon found');
    expect(emptyFavoriteText).toBeInTheDocument();
  });
  test('if there is favorite pokemons on the page', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const moreDetailsLink = screen.getByRole('link', {
      name: 'More details',
    });
    userEvent.click(moreDetailsLink);
    const favoriteCheckbox = screen.getByRole('checkbox');
    userEvent.click(favoriteCheckbox);
    const favoritesLink = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    userEvent.click(favoritesLink);
    const favoritePokemons = screen.getAllByRole('img')[0];
    expect(favoritePokemons).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
});
