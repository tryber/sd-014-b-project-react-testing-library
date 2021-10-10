import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from './RenderWithRouter';

describe('Testa o terceiro requisito', () => {
  test('Verifica se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const text = screen.getByText(/No favorite pokemon found/);
    expect(text).toBeInTheDocument();
  });

  test('Verifica se é exibido os pokemons favoritos', () => {
    const favoritesPokemons = [
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
    renderWithRouter(<FavoritePokemons pokemons={ favoritesPokemons } />);
    const pokemonsName = screen.getByTestId('pokemon-name');

    expect(pokemonsName).toBeInTheDocument();
  });
});
