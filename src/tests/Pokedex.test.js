import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helper/renderWithRouter';
import Pokedex from '../components/Pokedex';

const pikachu = [{
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  isPokemonFavoriteByIdType: true,
}];

test('if page has a <h2>', () => {
  renderWithRouter(<Pokedex pokemons={ pikachu } isPokemonFavoriteById={ { isPokemonFavoriteByIdType: true } } />);
  const title = screen.getByRole('heading', { name: 'Encountered pokémons' });
  expect(title).toBeInTheDocument();
});
