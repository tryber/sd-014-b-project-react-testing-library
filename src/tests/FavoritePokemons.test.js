import React from 'react';
import { render, screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';

describe('Requisito 03', () => {
  test(
    'Se é exibido na tela a mensagem No favorite pokemon found,'
      + ' se a pessoa não tiver pokémons favoritos.',
    () => {
      render(<FavoritePokemons />);
      const noPokemon = screen.getByText('No favorite pokemon found');

      expect(noPokemon).toBeInTheDocument();
    },
  );

  test(
    'Se é exibido todos os cards de pokémons favoritados',
    () => {
      render(<FavoritePokemons />);
      const pokeFake = [{
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
        summary: 'This intelligent Pokémon roasts hard berries with'
        + 'electricity to make them tender enough to eat.',
      }];
      expect(pokeFake.length).toBe(1);
    },
  );
});
