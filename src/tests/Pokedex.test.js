import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente <Pokedex />', () => {
  test('Se a página contém um heading com um texto', () => {
    renderWithRouter(<App />);

    const header = screen.getByText(/Encountered pokémons/i);
    expect(header).toBeInTheDocument();
  });

  test('Se o próximo Pokémon é exibido clicando no botão "Próximo pokémon"', () => {
    renderWithRouter(<App />);

    const nextPokemon = screen.getByTestId('next-pokemon');
    expect(nextPokemon).toHaveTextContent(/Próximo pokémon/i);
    expect(nextPokemon).toBeInTheDocument();

    const pokemonName = screen.getByTestId('pokemon-name');

    pokemons.forEach((pokemon, index) => {
      const lastPosition = pokemons.length - 1;
      if (index === lastPosition) {
        userEvent.click(nextPokemon);
        expect(pokemonName).toHaveTextContent('Pikachu');
      } else {
        expect(pokemonName).toHaveTextContent(pokemon.name);
        userEvent.click(nextPokemon);
      }
    });
  });

  test('Se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getAllByTestId('pokemon-name');
    expect(pokemonName).toHaveLength(1);
  });

  test('Se a Pokédex possui botões de filtro', () => {
    renderWithRouter(<App />);

    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    filterButtons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });

    const typesOfPokemons = pokemons.map((pokemon) => pokemon.type);
    typesOfPokemons.forEach((type) => {
      const buttonType = screen.getByRole('button', { name: type });
      expect(buttonType).toBeInTheDocument();
    });

    const nextPokemon = screen.getByTestId('next-pokemon');

    typesOfPokemons.forEach((type) => {
      const buttonType = screen.getByRole('button', { name: type });
      userEvent.click(buttonType);
      const filteredPokemons = pokemons.filter((pokemon) => pokemon.type === type);
      filteredPokemons.forEach((pokemon) => {
        expect(pokemon.type).toBe(type);
        userEvent.click(nextPokemon);
      });
    });
  });

  test('Se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const resetButton = screen.getByRole('button', { name: 'All' });
    expect(resetButton).toBeInTheDocument();
    userEvent.click(resetButton);
    const pokemon = screen.getByText('Pikachu');
    expect(pokemon).toBeInTheDocument();
  });
});
