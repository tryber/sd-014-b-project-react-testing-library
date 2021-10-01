import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Req3: Testing Component <FavoritePokemons />', () => {
  test('if <FavoritePokemons /> displays "No favorite Pokemon found" when needed', () => {
    renderWithRouter(<FavoritePokemons />);

    const notFound = screen.getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });

  test('if <FavoritePokemons /> displays favorite pokemon properly', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(detailsLink);

    const favoriteCheck = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    fireEvent.click(favoriteCheck);

    renderWithRouter(<FavoritePokemons />);

    const favPokemon = screen.getByTestId('pokemon-name');
    expect(favPokemon).toBeInTheDocument();
  });
});
