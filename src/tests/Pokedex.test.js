import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste do componente Pokedex', () => {
  it('deveria conter um <h2> com o texto `Encountered pokémons`', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });
    expect(title).toBeInTheDocument();
  });

  it('deveria mostrar o próximo Pokemon ao clicar em Próximo pokémon', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(nextButton);
    const nextPokemon = screen.getByText('Charmander');
    expect(nextPokemon).toBeInTheDocument();
  });

  it('deveria haver apenas 1 pokemon na página', () => {
    renderWithRouter(<App />);
    const allPokemons = screen.getAllByTestId('pokemon-name');
    expect(allPokemons.length).toStrictEqual(1);
  });

  it('deveriam existir botões de filtro e os mesmos devem filtrar os pokemons', () => {
    renderWithRouter(<App />);
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    filterButtons.forEach((button) => {
      userEvent.click(button);
      const pokemonType = screen.getByTestId('pokemon-type');
      expect(button.innerHTML).toEqual(pokemonType.innerHTML);
    });
  });
});
