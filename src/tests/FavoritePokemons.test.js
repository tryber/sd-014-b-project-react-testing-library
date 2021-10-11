import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('test component FavoritePokemons', () => {
  test(`if the person doesn't have favorite pokemons,
   the message is displayed on the screen.`, () => {
    render(<FavoritePokemons />);
    const text = screen.getByText('No favorite pokemon found');
    expect(text).toBeInTheDocument();
  });
  test('if all favorite Pokemon cards are displayed.', () => {
    const pokemons = [
      {
        id: 25,
        name: 'Pikachu',
        type: 'Electric',
        averageWeight: {
          value: '6.0',
          measurementUnit: 'kg',
        },
      },
    ];
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    const namePokemon = screen.getByText('Pikachu');
    const typePokemon = screen.getByText('Electric');
    const averageWeightPokemon = screen.getByText('Average weight: 6.0 kg');
    expect(namePokemon).toBeInTheDocument();
    expect(typePokemon).toBeInTheDocument();
    expect(averageWeightPokemon).toBeInTheDocument();
  });
});
