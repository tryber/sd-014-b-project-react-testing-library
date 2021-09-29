import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import Pokedex from '../components/Pokedex';

const pokemons = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
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
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Alola Route 3',
        map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 3',
        map: 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 4',
        map: 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
      },
      {
        location: 'Kanto Rock Tunnel',
        map: 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
      },
    ],
  }];

test('if page has a <h2>', () => {
  renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ { isPokemonFavoriteById: true } }
    />,
  );
  const title = screen.getByRole('heading', { name: 'Encountered pokémons' });
  expect(title).toBeInTheDocument();
});

test('Se o proximo pokemon é exibido quando "proximo pokemon" é clicado', () => {
  renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ { isPokemonFavoriteById: true } }
    />,
  );
  const button = screen.getByRole('button', { name: 'Próximo pokémon' });
  expect(button).toBeInTheDocument();
  userEvent.click(button);
  let secondPokemon = screen.getByText('Charmander');
  expect(secondPokemon).toBeInTheDocument();
  userEvent.click(button);
  const firstPokemon = screen.getByText('Pikachu');
  expect(firstPokemon).toBeInTheDocument();
  secondPokemon = screen.queryByText('Charmander');
  expect(secondPokemon).toBeNull();
});
