import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Pokedex', () => {
  test('Se página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<App />);

    const h2 = screen.getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(h2).toBeInTheDocument();
  });

  test(`Se é exibido o próximo Pokémon da
    lista quando o botão Próximo pokémon é clicado`, () => {
    renderWithRouter(<App />);

    const nextPokemonBtn = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(nextPokemonBtn).toBeInTheDocument();

    for (let i = 1; i < pokemons.length; i += 1) {
      userEvent.click(nextPokemonBtn);
      expect(screen.getByText(pokemons[i].name)).toBeInTheDocument();
    }
  });

  test('Se é mostrado apenas um pokemon por vez', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon.length).toEqual(1);
  });

  test('Se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const type = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    type.forEach((typePokemon) => {
      const button = screen.getByRole('button', { name: typePokemon });
      expect(button).toBeInTheDocument();
    });

    const filterPokemonsBtn = screen.getAllByTestId('pokemon-type-button');
    expect(filterPokemonsBtn.length).toEqual(type.length);

    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(allBtn).toBeInTheDocument();
  });

  test('Se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const resetAllBtn = screen.getByRole('button', { name: 'All' });
    userEvent.click(resetAllBtn);
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
});
