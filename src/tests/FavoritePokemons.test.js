import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../services/renderWithRouter';

describe('Requisito 3: Teste o componente <FavoritePokemons.js />', () => {
  test(' No favorite pokemon found, se a pessoa não tiver pokémons favoritos.', () => {
    renderWithRouter(<FavoritePokemons />);
    const msg = screen.getByText('No favorite pokemon found');
    expect(msg).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const poquemaum = [{
      id: 78,
      name: 'Rapidash',
      type: 'Fire',
      averageWeight: {
        value: '95.0',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/5/58/Spr_5b_078.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Rapidash_(Pok%C3%A9mon)',
      foundAt: [
        {
          location: 'Kanto Route 28',
          map: 'https://cdn2.bulbagarden.net/upload/5/5b/Kanto_Route_28_Map.png',
        },
        {
          location: 'Johto Mount Silver',
          map: 'https://cdn2.bulbagarden.net/upload/9/95/Johto_Mt_Silver_Map.png',
        },
      ],
    }];
    renderWithRouter(<FavoritePokemons pokemons={ poquemaum } />);
    const msg = screen.getByText('Rapidash');
    expect(msg).toBeInTheDocument();
  });
});
