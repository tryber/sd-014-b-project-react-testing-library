import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../components/renderWithRouter';

describe('Requisito 03', () => {
  it('É exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFound = screen.getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });
  it('É exibido todos os cards de pokémons favoritados', () => {
    const pokemonsFavorited = [
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
        summary: 'For protection, it releases a horrible stench'
        + 'from the antennae on its head to drive away enemies.',
      },
    ];
    renderWithRouter(<FavoritePokemons pokemons={ pokemonsFavorited } />);
    const favoritePokemon = screen.getByText('Caterpie');
    expect(favoritePokemon).toBeInTheDocument();
  });
});
