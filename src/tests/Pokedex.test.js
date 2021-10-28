import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const POKEMON_NAME = 'pokemon-name';

describe('5. Testes da Pokedex.js', () => {
  it('Se contém um h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const encounteredPokemons = screen.getByRole('heading',
      { name: 'Encountered pokémons' });
    expect(encounteredPokemons).toBeInTheDocument();
  });

  it('Se exibe o próximo pokémon, quando clicam no botão "Próximo pokémon"', () => {
    renderWithRouter(<App />);

    const nextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(nextPokemon).toBeInTheDocument();

    const pokemonName = screen.getByTestId(POKEMON_NAME);

    pokemons.forEach(({ name }, index) => {
      if (index === pokemons.length - 1) {
        expect(pokemonName.textContent).toBe(name);
        userEvent.click(nextPokemon);
        expect(pokemonName.textContent).toBe('Pikachu');
      } else {
        expect(pokemonName.textContent).toBe(name);
        userEvent.click(nextPokemon);
      }
    });
  });

  it('Se exibe um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getAllByTestId(POKEMON_NAME);
    expect(pokemonName.length).toBe(1);
  });

  it('Se a Pokédex tem botões de filtro', () => {
    renderWithRouter(<App />);

    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    typeButtons.forEach((button) => {
      expect(button).toBeInTheDocument();
      const typeBtn = screen.getByRole('button', { name: button.textContent });
      const pokemonsByType = pokemons.filter((pokemon) => (
        pokemon.type === button.textContent
      ));
      userEvent.click(typeBtn);
      const nextPokemon = screen.getByTestId('next-pokemon');
      const pokemonName = screen.getByTestId(POKEMON_NAME);
      const pokemonType = screen.getByTestId('pokemon-type');

      pokemonsByType.forEach((pokemon) => {
        expect(pokemon.type).toBe(button.textContent);
        expect(pokemonName.textContent).toBe(pokemon.name);
        expect(pokemonType.textContent).toBe(pokemon.type);
        userEvent.click(nextPokemon);
      });
    });
  });

  it('Se existe um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(allBtn).toBeInTheDocument();
    userEvent.click(allBtn);
  });
});
