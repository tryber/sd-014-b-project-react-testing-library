import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o Pokedex.js', () => {
  test('se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const pokedexTitle = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons' });
    expect(pokedexTitle).toBeInTheDocument();
  });

  test('se é exibido o próximo Pokémon quando o botão Próximo pokémon é clicado.', () => {
    renderWithRouter(<App />);

    const nextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(nextPokemon).toBeInTheDocument();
    userEvent.click(nextPokemon);
  });

  test('se é exibido um pokemon por vez', () => {
    renderWithRouter(<App />);

    const pokemonList = screen.getAllByTestId('pokemon-name');
    expect(pokemonList.length).toBe(1);
  });

  test('se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const btnFilters = screen.getAllByTestId('pokemon-type-button');
    const qtdBtn = 7;
    expect(btnFilters.length).toBe(qtdBtn);
    // Ref.: https://github.com/tryber/sd-014-b-project-react-testing-library/pull/64/commits/4c71e7e389e04457633dd65a72d1316d7e53e18a
    pokemons.forEach(({ type }) => {
      const pokemonTypeBtn = screen.getByRole('button', { name: `${type}` });
      expect(pokemonTypeBtn).toBeInTheDocument();
    });
  });

  test('se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const resetBtn = screen.getByRole('button', { name: 'All' });
    expect(resetBtn).toBeInTheDocument();
    userEvent.click(resetBtn);

    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
