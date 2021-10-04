import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';

const favoritePokemonsMock = [{ id: 65, name: 'Alakazam', type: 'Psychic', averageWeight: { value: '48.0', measurementUnit: 'kg' }, image: 'https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png', moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Alakazam_(Pok%C3%A9mon)', foundAt: [{ location: 'Unova Accumula Town', map: 'https://cdn2.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png' }], summary: 'Closing both its eyes heightens all its other senses. This enables it to use its abilities to their extremes.' }, { id: 143, name: 'Snorlax', type: 'Normal', averageWeight: { value: '460.0', measurementUnit: 'kg' }, image: 'https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png', moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Snorlax_(Pok%C3%A9mon)', foundAt: [{ location: 'Kanto Vermillion City', map: 'https://cdn2.bulbagarden.net/upload/5/54/Kanto_Vermilion_City_Map.png' }], summary: 'What sounds like its cry may actually be its snores or the rumblings of its hungry belly.' }, { id: 148, name: 'Dragonair', type: 'Dragon', averageWeight: { value: '16.5', measurementUnit: 'kg' }, image: 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png', moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Dragonair_(Pok%C3%A9mon)', foundAt: [{ location: 'Johto Route 45', map: 'https://cdn2.bulbagarden.net/upload/2/21/Johto_Route_45_Map.png' }, { location: 'Johto Dragon\'s Den', map: 'https://cdn2.bulbagarden.net/upload/1/1e/Johto_Dragons_Den_Map.png' }], summary: 'They say that if it emits an aura from its whole body, the weather will begin to change instantly.' }];

describe('Tests the FavoritePokemons.js application', () => {
  test('`No favorite pokemon found` appears when there are no favorited pokémon', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const notFound = screen.getByText(/No favorite pokemon found/);
    expect(notFound).toBeInTheDocument();
  });
  test('all cards for favorited pokémon are shown', () => {
    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemonsMock } />);
    const cards = screen.getAllByText(/More details/);
    const EXPECTED_LENGTH = 3;
    expect(cards).toHaveLength(EXPECTED_LENGTH);
  });
});
