import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import RouterRender from '../components/RouterRender';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

// Consultei o repositório do Matheus Silveira para
// conseguir terminar esse requisito

describe('Testing the Pokemon component', () => {
  it('it should render a card with information of a chosen pokemon', () => {
    const pokemon = pokemons[0];
    const { name, type, averageWeight: { value, measurementUnit }, image } = pokemon;

    RouterRender(<Pokemon pokemon={ pokemon } isFavorite={ false } />);

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

  it(`should have a navigation link on the indicated Pokémon card to show 
  the details of that pokémon`, () => {
    const pokemon = pokemons[0];
    const { id } = pokemon;

    RouterRender(<Pokemon pokemon={ pokemon } isFavorite={ false } />);

    const detailsLink = screen.getByRole('link', { name: 'More details' });
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute('href', `/pokemons/${id}`);
  });

  it(`should redirect to detail page when clicked on the navigation 
  link of the Pokémon`, () => {
    const pokemon = pokemons[0];
    const { id } = pokemon;

    const { history } = RouterRender(
      <Pokemon pokemon={ pokemon } isFavorite={ false } />,
    );

    const detailsLink = screen.getByRole('link', { name: 'More details' });
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute('href', `/pokemons/${id}`);

    fireEvent.click(detailsLink);

    const { pathname } = history.location;

    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('should have a star icon on the favorite pokémons', () => {
    const pokemon = pokemons[0];
    const { name } = pokemon;

    RouterRender(<Pokemon pokemon={ pokemon } isFavorite />);

    const isFavorite = screen.getByRole('img', {
      name: `${name} is marked as favorite`,
    });
    expect(isFavorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
