import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste do componente Pokedex', () => {
  const POKEMON_TYPE_TESTID = 'pokemon-type';
  beforeEach(() => renderWithRouter(<App />));

  it('deveria conter um <h2> com o texto `Encountered pokémons`', () => {
    const title = screen.getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });
    expect(title).toBeInTheDocument();
  });

  it('deveria mostrar o próximo Pokemon ao clicar em Próximo pokémon', () => {
    const { innerHTML: firstPokemon } = screen.getByTestId(POKEMON_TYPE_TESTID);
    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(nextButton);
    const { innerHTML: secondPokemon } = screen.getByTestId(POKEMON_TYPE_TESTID);
    expect(firstPokemon).not.toStrictEqual(secondPokemon);
  });

  it('deveria haver apenas 1 pokemon na página', () => {
    const allPokemons = screen.getAllByTestId('pokemon-name');
    expect(allPokemons.length).toStrictEqual(1);
  });

  it('deveriam existir botões de filtro e os mesmos devem filtrar os pokemons', () => {
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    filterButtons.forEach((button) => {
      userEvent.click(button);
      const pokemonType = screen.getByTestId(POKEMON_TYPE_TESTID);
      expect(button.innerHTML).toStrictEqual(pokemonType.innerHTML);
    });
  });
});
