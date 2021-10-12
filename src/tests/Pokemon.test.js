import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../uteis/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente "Pokemon".', () => {
  test('se o nome correto do pokemon aparece na tela', () => {
    renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      const pokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonName.innerHTML).toBe(pokemon.name);
      const buttonNextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
      userEvent.click(buttonNextPokemon);
    });
  });

  test('se o tipo correto do pokemon aparece na tela', () => {
    renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      const pokemonName = screen.getByTestId('pokemon-type');
      expect(pokemonName.innerHTML).toBe(pokemon.type);
      const buttonNextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
      userEvent.click(buttonNextPokemon);
    });
  });
});
