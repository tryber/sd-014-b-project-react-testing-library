import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helper/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

const Pikachu = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
};

test('se é exibido a mensagem  esperada caso não exista nenhum pokemon', () => {
  renderWithRouter(<FavoritePokemons />);
  const erroMensage = screen.getByText('No favorite pokemon found');
  expect(erroMensage).toBeInTheDocument();
});

test('se é exibido os pokemons favoritos', () => {
  renderWithRouter(<FavoritePokemons pokemons={ [Pikachu] } />);
  const pokemonName = screen.getByText('Pikachu');
  expect(pokemonName).toBeInTheDocument();
});
