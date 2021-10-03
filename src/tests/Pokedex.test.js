import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

// linha 9 dica do Michael Caxias tribo 14B
const POKEMON_NAME = 'pokemon-name';

describe('TEste Pokedex.js', () => {
  it('verifica se tem h2 com texto', () => {
    renderWithRouter(<App />);

    const pokeH2 = screen.getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });
    expect(pokeH2).toBeInTheDocument();
  });

  it('Outro pokemon aparece qnd clica Prox Pokemon', () => {
    renderWithRouter(<App />);
    const next = screen.getByTestId('next-pokemon');
    expect(next).toBeInTheDocument();

    const pokeName = screen.getByTestId(POKEMON_NAME);

    pokemons.forEach(({ name }, index) => {
      if (index === pokemons.length - 1) {
        expect(pokeName.textContent).toBe(name);
        userEvent.click(next);
        expect(pokeName.textContent).toBe('Pikachu');
      } else {
        expect(pokeName.textContent).toBe(name);
        userEvent.click(next);
      }
    });
  });

  it('Verifica se vem um poke por vez', () => {
    renderWithRouter(<App />);
    const pokeName = screen.getAllByTestId(POKEMON_NAME);
    expect(pokeName.length).toBe(1);
  });

  it('Verifica se possui botão filtro', () => {
    renderWithRouter(<App />);

    const pokeTypes = ['Electric', 'Fire', 'Bug', 'Poison',
      'Psychic', 'Normal', 'Dragon'];

    const buttons = screen.getAllByTestId('pokemon-type-button');

    buttons.forEach((type) => {
      expect(type).toBeInTheDocument();
    });

    pokeTypes.forEach((type) => {
      const buttonType = screen.getByRole('button', { name: type });
      const filterPokeType = pokemons.filter((pokemon) => pokemon.type === type);
      userEvent.click(buttonType);

      const nextPokemon = screen.getByTestId('next-pokemon');
      const pokemonName = screen.getByTestId(POKEMON_NAME);
      const pokemonType = screen.getByTestId('pokemon-type');

      filterPokeType.forEach((pokemon) => {
        expect(pokemon.type).toBe(type);
        expect(pokemonName.textContent).toBe(pokemon.name);
        expect(pokemonType.textContent).toBe(pokemon.type);
        userEvent.click(nextPokemon);
      });
    });
  });
  it('botao reset filtro', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);
  });
});
