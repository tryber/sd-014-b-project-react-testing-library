import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente FavoritePokemons', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavoritePokemons = screen.getByText(/Favorite Pokémons/i);
    expect(linkFavoritePokemons).toBeInTheDocument();
    userEvent.click(linkFavoritePokemons);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const pokedexFavoritePokemons = screen.getByText(/No favorite pokemon found/i);
    expect(pokedexFavoritePokemons).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    // const pokemons = [{ id: 25, name: 'Pikachu', type: 'Electric', averageWeight: { value: '6.0', measurementUnit: 'kg' }, image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png', moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)', foundAt: [{ location: 'Kanto Viridian Forest', map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png' }, { location: 'Kanto Power Plant', map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png' }], summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.' }, { id: 4, name: 'Charmander', type: 'Fire', averageWeight: { value: '8.5', measurementUnit: 'kg' }, image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png', moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)', foundAt: [{ location: 'Alola Route 3', map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png' }, { location: 'Kanto Route 3', map: 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png' }, { location: 'Kanto Route 4', map: 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png' }, { location: 'Kanto Rock Tunnel', map: 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png' }], summary: 'The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly.' }];
    const { history } = renderWithRouter(<App />);
    const linkFavoritePokemons = screen.getByText(/Favorite Pokémons/i);
    expect(linkFavoritePokemons).toBeInTheDocument();
    userEvent.click(linkFavoritePokemons);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
