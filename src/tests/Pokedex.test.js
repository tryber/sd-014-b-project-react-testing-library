import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { Pokedex } from '../components';
import pokemons from '../data';

const setup = () => {
  const isPokemonFavoriteById = {};
  return renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />);
};

describe('Testa o componente Pokedex', () => {
  test('se página contém um heading h2 com o texto Encountered pokémons', () => {
    setup();
    const titlePokedex = screen.getByRole('heading',
      { name: 'Encountered pokémons' });
    expect(titlePokedex).toBeInTheDocument();
  });
  describe('Testa o botão próximo Pokemon', () => {
    test('se botão contem o texto Próximo pokémon', () => {
      setup();
      const textButton = screen.getByTestId('next-pokemon');
      expect(textButton.innerHTML).toBe('Próximo pokémon');
    });
    test('se os próximos Pokémons são mostrados ao clicar no botão', () => {
      setup();
      const pokemonDetail = screen.getByRole('link');
      expect(pokemonDetail.href).toContain('/pokemons/25');

      const nextButton = screen.getByTestId('next-pokemon');
      userEvent.click(nextButton);

      const pokemonDetailNext = screen.getByRole('link');
      expect(pokemonDetailNext.href).toContain('/pokemons/4');
    });
    // test('ao clicar no botão e estiver no último Pokémon, o primeiro é exibido;', () => {
    //   setup();
    // });
  });
});
