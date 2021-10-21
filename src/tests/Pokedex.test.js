import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente <Pokedex.js />', () => {
  test(`Teste se página contém um heading h2
  com o texto Encountered pokémons`, () => {
    renderWithRouter(<App />);

    const title = screen.getByText('Encountered pokémons');
    expect(title).toBeInTheDocument();
  });

  test(`Teste se é exibido o próximo Pokémon
  da lista quando o botão Próximo pokémon é clicad`, () => {
    renderWithRouter(<App />);

    const nextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(nextPokemon).toBeInTheDocument();
    userEvent.click(nextPokemon);
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemonList = screen.getAllByTestId('pokemon-name');
    expect(pokemonList.length).toBe(1);
  });

  test('se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const filters = screen.getAllByTestId('pokemon-type-button');
    const buttonAmount = 7;
    expect(filters.length).toBe(buttonAmount);

    pokemons.forEach(({ type }) => {
      const pokemonTypeBtn = screen.getByRole('button', { name: `${type}` });
      expect(pokemonTypeBtn).toBeInTheDocument();
    });
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();

    userEvent.click(buttonAll);
    const firstPokemon = screen.getByTestId('pokemon-name');
    expect(firstPokemon.innerHTML).toBe('Pikachu');
  });
});
