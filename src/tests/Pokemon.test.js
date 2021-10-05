import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import App from '../App';

describe('Testa o componente Pokemon.js', () => {
  test('se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonAverageWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByAltText('Pikachu sprite');

    expect(pokemonName.innerHTML).toBe('Pikachu');
    expect(pokemonType.innerHTML).toBe('Electric');
    expect(pokemonAverageWeight.innerHTML).toBe('Average weight: 6.0 kg');
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('se o card tem um link de navegação que muda a rota com o id do pokemon.', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    const homeLink = screen.getByRole('link', { name: 'Home' });

    userEvent.click(moreDetails);
    expect(history.location.pathname).toBe('/pokemons/25');

    const addFavorite = screen.getByRole('checkbox');
    userEvent.click(addFavorite);

    userEvent.click(homeLink);
    const favoriteStar = screen.getByAltText('Pikachu is marked as favorite');

    expect(favoriteStar).toBeInTheDocument();
    expect(favoriteStar).toHaveAttribute('src', '/star-icon.svg');
  });
});
