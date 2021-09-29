import { screen } from '@testing-library/react';
import React from 'react';

import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Testing the component <FavoritePokemons />', () => {
  it(`should show the message "No favorite pokemon found" on the screen 
      when no pokemon it is favorited`, () => {
    renderWithRouter(<FavoritePokemons />);

    expect(screen.getByText(/no favorite pokemon found/i)).toBeInTheDocument();
  });

  it('should show all favorite pokemon cards', () => {
    const favoritePokemonsMock = [
      { id: 25,
        name: 'Pikachu',
        type: 'Electric',
        averageWeight: { value: '6.0', measurementUnit: 'kg' },
        image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      },
      { id: 4,
        name: 'Charmander',
        type: 'Fire',
        averageWeight: { value: '8.5', measurementUnit: 'kg' },
        image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
      },
    ];

    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemonsMock } />);

    expect(screen.getAllByTestId('pokemon-name')).toHaveLength(2);
  });
});
