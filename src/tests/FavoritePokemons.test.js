// npx stryker run ./stryker/FavoritePokemons.conf.json

import React from 'react';
import { screen, render } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('teste componente FavoritePokemons', () => {
  test('deve exibir: `No favorite pokemon found` se não houver pokemon favorito', () => {
    render(<FavoritePokemons />);
    const noPokemonFavorite = screen.getByText('No favorite pokemon found');
    expect(noPokemonFavorite).toBeInTheDocument();
  });

  test('Deve exibir cards com os dados dos pokemons favoritados', () => {
    const pokemonsMock = [
      {
        name: 'Pikachu',
        type: 'Electric',
        averageWeight: { value: '6.0', measurementUnit: 'kg' },
        image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      },
      {
        name: 'Charmander',
        type: 'Fire',
        averageWeight: { value: '8.5', measurementUnit: 'kg' },
        image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
      },
    ];

    renderWithRouter(<FavoritePokemons pokemons={ pokemonsMock } />);

    expect(screen.getAllByTestId('pokemon-name')).toHaveLength(2);

    const Names = screen.getAllByTestId('pokemon-name');
    expect(Names[0].textContent).toBe('Pikachu');
    expect(Names[1].textContent).toBe('Charmander');

    const types = screen.getAllByTestId('pokemon-type');
    expect(types[0].textContent).toBe('Electric');
    expect(types[1].textContent).toBe('Fire');

    const weight = screen.getAllByTestId('pokemon-weight');
    expect(weight[0]).toHaveTextContent(/6.0 kg/);
    expect(weight[1]).toHaveTextContent(/8.5 kg/);

    const img = screen.getAllByAltText(/sprite/);
    expect(img[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(img[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
  });
});
