import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe(('Requisito 3 - Testa o componente <FavoritePokemons />'), () => {
  test('Sem pokémons favoritos, mostra No favourite pokemon found', () => {
    // Renderiza o componente FavoritePokemons com prop pokemons vazia
    // Os jovens chamam isso de "mockar"
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  test('Se houver pokémons favoritados, mostra os cards', () => {
    // Peguei do data.js o id do Pikachu
    const idPikachu = 25;
    // Importei pokemons do data
    // e filtrei pelo id do Pikachu. Por quê?
    // Porque FavoritePokemons precisa receber
    // um array pra fazer map
    const pokemonFilter = pokemons.filter(
      ({ id }) => id === idPikachu,
    );
    renderWithRouter(<FavoritePokemons pokemons={ pokemonFilter } />);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
});
