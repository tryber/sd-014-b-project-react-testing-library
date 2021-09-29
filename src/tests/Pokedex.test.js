import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const POKENAME = 'pokemon-name';

describe('Teste 5 - Pokedex.js', () => {
  it('Teste se página contém um heading h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(h2).toBeInTheDocument();
  });

  it('Verifica se outro pokémon é exibido quando `Proximo Pokemon` é clicado', () => {
    renderWithRouter(<App />);
    const nextPokemon = screen.getByTestId('next-pokemon');
    expect(nextPokemon).toBeInTheDocument();
    const pokemonName = screen.getByTestId(POKENAME);

    pokemons.forEach(({ name }, index) => {
      if (index === pokemons.length - 1) {
        expect(pokemonName.textContent).toBe(name);
        fireEvent.click(nextPokemon);
        expect(pokemonName.textContent).toBe('Pikachu');
      } else {
        expect(pokemonName.textContent).toBe(name);
        fireEvent.click(nextPokemon);
      }
    });
  });

  it('Verifica se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getAllByTestId(POKENAME);
    expect(pokemonName.length).toBe(1);
  });

  it('Verifica se a pokédex tem botões de filtro', () => {
    renderWithRouter(<App />);

    const pokemonTypes = ['Electric', 'Fire', 'Bug',
      'Poison', 'Psychic', 'Normal', 'Dragon'];

    const buttonsType = screen.getAllByTestId('pokemon-type-button');

    buttonsType.forEach((type) => {
      expect(type).toBeInTheDocument();
    });

    pokemonTypes.forEach((type) => {
      const buttonType = screen.getByRole('button', { name: type });
      const pokemonsByType = pokemons.filter((pokemon) => pokemon.type === type);
      fireEvent.click(buttonType);

      const nextPokemon = screen.getByTestId('next-pokemon');
      const pokemonName = screen.getByTestId(POKENAME);
      const pokemonType = screen.getByTestId('pokemon-type');

      pokemonsByType.forEach((pokemon) => {
        expect(pokemon.type).toBe(type);
        expect(pokemonName.textContent).toBe(pokemon.name);
        expect(pokemonType.textContent).toBe(pokemon.type);
        fireEvent.click(nextPokemon);
      });
    });
  });

  it('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
    fireEvent.click(buttonAll);
  });
});
