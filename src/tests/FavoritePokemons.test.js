import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

const favoritePokemons = [
  {
    id: 65,
    name: 'Alakazam',
    type: 'Psychic',
    averageWeight: {
      value: '48.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Alakazam_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Unova Accumula Town',
        map: 'https://cdn2.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png',
      },
    ],
    summary: `Closing both its eyes heightens all its other senses. 
    This enables it to use its abilities to their extremes.`,
  },
];

const unselected = [];

describe('Testing if <FavoritePokemons /> is rendering the correct information', () => {
  it(`should return 'No favorite pokemon found',
  if the user has no favorite pokemon`, () => {
    renderWithRouter(<FavoritePokemons
      pokemons={ unselected }
    />);

    expect(screen.getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });

  it('should render all favorite Pokémon', () => {
    renderWithRouter(<FavoritePokemons
      pokemons={ favoritePokemons }
    />);

    const pokemons = screen.getAllByTestId('pokemon-name').length;

    expect(pokemons).toBe(1);
  });
});
