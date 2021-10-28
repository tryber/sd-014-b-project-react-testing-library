import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';

describe('testes do componente FavoritePokemons', () => {
  it('a mensagem No favorite pokemon found é exibida se não houverem favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const text = screen.getByText(/No favorite pokemon found/i);
    expect(text).toBeInTheDocument();
  });
  it('exibe os pokemons favoritos', () => {
    const pokemon = [
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
    renderWithRouter(<FavoritePokemons pokemons={ pokemon } />);
    const pokemonName = screen.getByText('Pikachu');
    expect(pokemonName).toBeInTheDocument();
  });
});
