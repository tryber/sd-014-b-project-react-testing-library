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
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    // Número de pokémons
    const numberOfPokemons = 9;
    // Tamanho do array de pokémons na tela se todos favoritados
    const { length } = screen.getAllByTestId('pokemon-name');
    // Testa se esse tamanho é igual ao número de pokémons
    expect(length).toBe(numberOfPokemons);
  });
});
