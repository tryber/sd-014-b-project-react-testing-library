import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Tests the PokemonDetails.js application', () => {
  test('detailed information about the selected pokémon is shown', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const heading = screen.getByRole('heading', { level: 2, name: 'Pikachu Details' });
    const summary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    const link = screen.getByRole('link', { name: 'More details' });
    const text = screen.getByText(/This intelligent Pokémon roastshard berries/);
    expect(heading).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(link).not.toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
  test('contains map with the location of the pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });
    const locations = screen.getAllByAltText('Pikachu location');
    const locationName1 = screen.getByText('Kanto Viridian Forest');
    const locationName2 = screen.getByText('Kanto Power Plant');
    const MAXIMUM_LENGTH = 2;
    expect(heading).toBeInTheDocument();
    expect(locations.length).toBe(MAXIMUM_LENGTH);
    expect(locationName1).toBeInTheDocument();
    expect(locationName2).toBeInTheDocument();
    expect(locations[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locations[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  test('user can favorite a pokémon using the detailed page', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
  });
});
