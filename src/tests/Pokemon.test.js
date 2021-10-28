import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Testing if <NotFound /> is rendering the correct information', () => {
  it('should render a single card of a chosen pokemon', () => {
    const pokemon = pokemons[0];
    const { name, type, averageWeight: { value, measurementUnit }, image } = pokemon;

    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName.textContent).toBe(name);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.textContent).toBe(type);

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight.textContent)
      .toBe(`Average weight: ${value} ${measurementUnit}`);

    const pokemonImage = screen.getByRole('img', { name: `${name} sprite` });
    expect(pokemonImage).toHaveAttribute('src', image);
  });

  it('should have a navlink to the details of that pokemon', () => {
    const pokemon = pokemons[0];
    const { id } = pokemon;

    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);

    const moreDetails = screen.getByRole('link', { name: 'More details' });
    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails).toHaveAttribute('href', `/pokemons/${id}`);
  });

  it(`when clicked, should display the details of the chosen pokémon,
  with the correct route`, () => {
    const pokemon = pokemons[0];
    const { id } = pokemon;

    const { history } = renderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite={ false } />,
    );

    const detailsLink = screen.getByRole('link', { name: 'More details' });
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute('href', `/pokemons/${id}`);

    fireEvent.click(detailsLink);

    const { pathname } = history.location;

    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('should apply a starred stats when the user select their favorite pokemon', () => {
    const pokemon = pokemons[0];
    const { name } = pokemon;

    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);

    const isFavorite = screen.getByRole('img', {
      name: `${name} is marked as favorite`,
    });
    expect(isFavorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
