import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('5 - Testa o arquivo Pokedex.js', () => {
  it('Verifica se a página contém um h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const encounteredPokemons = screen.getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });
    expect(encounteredPokemons).toBeInTheDocument();
  });

  it('Verifica se outro pokémon é exibido quando `Proximo Pokemon` é clicado', () => {
    renderWithRouter(<App />);
    const nextPokemon = screen.getByTestId('next-pokemon');
    expect(nextPokemon).toBeInTheDocument();

    const pokemonName = screen.getByTestId('pokemon-name');

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
  it('Verifica se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getAllByTestId('pokemon-name');
    expect(pokemonName.length).toBe(1);
  });
  it('Verifica se a pokédex tem botões de filtro', () => {
    renderWithRouter(<App />);

    const pokemonTypes = ['Electric', 'Fire', 'Bug',
      'Poison', 'Pyshic', 'Normal', 'Dragon'];

    const buttonsType = screen.getAllByTestId('pokemon-type-button');
    const nextPokemon = screen.getByTestId('next-pokemon');

    buttonsType.forEach((type) => {
      expect(type).toBeInTheDocument();
    });

    pokemonTypes.forEach((type) => {
      buttonsType.forEach((button) => {
        userEvent.click(button);
        const pokemonsByType = pokemons.filter((pokemon) => pokemon.type === type);
        pokemonsByType.forEach((pokemon) => {
          expect(pokemon.type).toBe(type);
          userEvent.click(nextPokemon);
        });
      });
    });
  });
  it('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
  });
});
