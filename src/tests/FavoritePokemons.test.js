import { screen } from '@testing-library/react';
import React from 'react';

import renderWithRouter from './utils/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);

    const notFound = screen.getByText(/no favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });

  test('Verifica se é exibido os pokémons favoritos', () => {
    const pokemons = [
      {
        averageWeight: {},
        id: 1,
        image: '',
        name: 'Bulbasaur',
        type: '',
      }];

    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    const favoritePokemon = screen.getByRole('link', { name: 'More details' });
    expect(favoritePokemon.href).toContain('/pokemons/1');
  });
});
