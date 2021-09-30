import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import FavoritePokemons from '../components/FavoritePokemons';

test('Se é exibido a frase "No favorite pokemon found"', () => {
  render(<FavoritePokemons />);
  const empty = screen.getByText(/No favorite pokemon found/i);

  expect(empty).toBeInTheDocument();
});

test('Se aparece o cards de pokemons favoritos', () => {
  const pokemonCard = [
    {
      averageWeight: {
        measurementUnit: 'kg',
        value: '6.0',
      },
      foundAt: [
        {
          location: 'Kanto Viridian Forest',
          map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
        },
        {
          location: 'Kanto Power Plant',
          map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
        },
      ],
      id: 25,
      image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
      name: 'Pikachu',
      summary: 'This intelligent Pokémon ...',
      type: 'Electric',
    },
  ];
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <FavoritePokemons pokemons={ pokemonCard } />
    </Router>,
  );
  const pokemonName = screen.getByText('Pikachu');

  expect(pokemonName).toBeInTheDocument();
});
