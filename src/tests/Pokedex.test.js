import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import data from '../data';

import App from '../App';

describe('Pokedex.js testcase', () => {
  test('se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);

    const pokemons = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(pokemons).toBeInTheDocument();
  });

  test(`se é exibido o próximo Pokémon da lista
   quando o botão Próximo pokémon é clicado`, () => {
    renderWithRouter(<App />);

    let currentPokemon = screen.getByText('Pikachu');
    expect(currentPokemon).toBeInTheDocument();

    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });

    userEvent.click(nextButton);
    currentPokemon = screen.getByText('Charmander');
    expect(currentPokemon).toBeInTheDocument();

    userEvent.click(nextButton);
    currentPokemon = screen.getByText('Caterpie');
    expect(currentPokemon).toBeInTheDocument();

    userEvent.click(nextButton);
    currentPokemon = screen.getByText('Ekans');
    expect(currentPokemon).toBeInTheDocument();

    userEvent.click(nextButton);
    currentPokemon = screen.getByText('Alakazam');
    expect(currentPokemon).toBeInTheDocument();

    userEvent.click(nextButton);
    currentPokemon = screen.getByText('Mew');
    expect(currentPokemon).toBeInTheDocument();

    userEvent.click(nextButton);
    currentPokemon = screen.getByText('Rapidash');
    expect(currentPokemon).toBeInTheDocument();

    userEvent.click(nextButton);
    currentPokemon = screen.getByText('Snorlax');
    expect(currentPokemon).toBeInTheDocument();

    userEvent.click(nextButton);
    currentPokemon = screen.getByText('Dragonair');
    expect(currentPokemon).toBeInTheDocument();

    userEvent.click(nextButton);
    currentPokemon = screen.getByText('Pikachu');
    expect(currentPokemon).toBeInTheDocument();
  });

  test('se é mostrado apenas um Pokémon por vez. ', () => {
    renderWithRouter(<App />);

    const pokemons = screen.getAllByTestId('pokemon-name');
    expect(pokemons).toHaveLength(1);
  });

  test('Se existe um botão de filtragem para cada tipo de Pokémon, sem repetição', () => {
    renderWithRouter(<App />);
    const seven = 7;

    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    expect(typeButtons).toHaveLength(seven);
  });

  it('se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: 'All' });
    userEvent.click(allButton);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });

  test(`A partir da seleção de um botão de tipo,
   a Pokédex deve circular somente pelos pokémons daquele tipo`, () => {
    renderWithRouter(<App />);

    const fireButton = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(fireButton);

    const pokemonType = data.filter(({ type }) => type === 'Fire');
    expect(pokemonType).toHaveLength(2);
  });
});
