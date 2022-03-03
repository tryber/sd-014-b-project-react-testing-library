import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import data from '../data';

describe('Testing if <PokemonDetails /> is rendering the correct information', () => {
  it('should display the correct informations of the selected pokemon', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    history.push('/pokemons/65');

    const pokemonName = screen.getByRole('heading', {
      level: 2,
      name: `${data[4].name} Details`,
    });
    expect(pokemonName).toBeInTheDocument();

    expect(moreDetails).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', { name: 'Summary' });
    expect(summary).toBeInTheDocument();

    const pokemonSummary = screen.getByText(data[4].summary);
    expect(pokemonSummary).toBeInTheDocument();

    const gameLocation = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${data[4].name}`,
    });
    expect(gameLocation).toBeInTheDocument();

    const urlMap = data[4].foundAt[0].map;
    const pokemonLocation = screen.getByAltText(`${data[4].name} location`);
    expect(pokemonLocation).toHaveAttribute('src', urlMap);

    const isFavorite = screen.getByLabelText(/Pokémon favoritado?/);
    expect(isFavorite).toBeInTheDocument();
  });
});
