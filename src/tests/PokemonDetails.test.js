import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testing component PokemonDetails', () => {
  it('Should have informations about the pokémon', () => {
    renderWithRouter(<App />);

    const linkPokemon = screen.getByText('More details');
    userEvent.click(linkPokemon);

    const titlePokemonDetails = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    expect(titlePokemonDetails).toBeInTheDocument();

    const summaryPokemonDetails = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(summaryPokemonDetails).toBeInTheDocument();

    const paragraphSummary = screen
      .getByText('This intelligent Pokémon roasts hard'
      + ' berries with electricity to make them tender enough to eat.');
    expect(paragraphSummary).toBeInTheDocument();

    const headinPokemonLocation = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });
    expect(headinPokemonLocation).toBeInTheDocument();

    const pokemonMap = screen.getAllByAltText('Pikachu location');
    expect(pokemonMap[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    const paragraphMap1 = screen.getByText('Kanto Viridian Forest');
    expect(paragraphMap1).toBeInTheDocument();

    expect(pokemonMap[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    const paragraphMap2 = screen.getByText('Kanto Power Plant');
    expect(paragraphMap2).toBeInTheDocument();

    const labelFavorite = screen.getByLabelText('Pokémon favoritado?');
    expect(labelFavorite).toBeInTheDocument();
    userEvent.click(labelFavorite);

    const labelStar = screen.getByAltText('Pikachu is marked as favorite');
    expect(labelStar).toBeInTheDocument();
    expect(labelStar).toHaveAttribute('src', '/star-icon.svg');
  });
});
