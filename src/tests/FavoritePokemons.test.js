import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import RenderWithRouter from '../RenderWithRouter';

const favoritePokemons = [
  {
    id: 10,
    name: 'Caterpie',
    type: 'Bug',
    averageWeight: {
      value: '2.9',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Caterpie_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Johto Route 30',
        map: 'https://cdn2.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png',
      },
      {
        location: 'Johto Route 31',
        map: 'https://cdn2.bulbagarden.net/upload/2/2b/Johto_Route_31_Map.png',
      },
      {
        location: 'Ilex Forest',
        map: 'https://cdn2.bulbagarden.net/upload/a/ae/Johto_Ilex_Forest_Map.png',
      },
      {
        location: 'Johto National Park',
        map: 'https://cdn2.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png',
      },
    ],
    summary: `For protection, it releases a horrible stench
    from the antennae on its head to drive away enemies.`,
  },
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

const favoriteless = [];

describe('Teste o componente <FavoritePokemons.js />', () => {
  it(`Teste se é exibido na tela a mensagem No favorite pokemon found,
  se a pessoa não tiver pokémons favoritos`, () => {
    RenderWithRouter(<FavoritePokemons pokemons={ favoriteless } />);
    expect(screen.getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });
  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    RenderWithRouter(<FavoritePokemons pokemons={ favoritePokemons } />);
    const pokemons = screen.getAllByTestId('pokemon-name').length;
    expect(pokemons).toBe(2);
  });
});
