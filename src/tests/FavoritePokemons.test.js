import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Requisito 3 - Favorites Pokémons', () => {
  test('Se é exibida a mensagem "No fav pokémon found" se não tiver favoritos', () => {
    renderWithRouter(<FavoritePokemons />);

    const notFavorites = screen.getByText('No favorite pokemon found');
    expect(notFavorites).toBeInTheDocument();
  });
});

// ref: https://github.com/tryber/sd-014-b-project-react-testing-library/pull/72/files

test('Se são exibidos todos os cards de pokémons favoritados.', () => {
  renderWithRouter(<App />);

  userEvent.click(screen.getByRole('link', { name: 'More details' }));
  userEvent.click(screen.getByRole('checkbox'));
  userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));

  const pokemonCards = screen.getByTestId('pokemon-name');
  expect(pokemonCards).toBeInTheDocument();
});
