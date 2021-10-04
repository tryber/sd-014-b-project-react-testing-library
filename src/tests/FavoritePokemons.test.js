import { screen } from '@testing-library/react';
import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Testando componente FavoritePokemons', () => {
  test('se é exibido na tela "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);
    const texto = screen.getByText(/No favorite pokemon found/);

    expect(texto).toBeInTheDocument();
  });

  test('se é exibido os pokemons favoritos', () => {
    const pokemonsFavoriosMock = [
      {
        id: 25,
        name: 'Pikachu',
        type: 'Electric',
        averageWeight: {
          value: '6.0',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      },
    ];
    renderWithRouter(<FavoritePokemons pokemons={ pokemonsFavoriosMock } />);

    const pkemonsFavoritos = screen.getByTestId('pokemon-name');

    expect(pkemonsFavoritos).toBeInTheDocument();
  });
});
