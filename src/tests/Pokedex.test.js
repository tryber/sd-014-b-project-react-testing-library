import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const NEXT_POKEMON = 'Próximo pokémon';
const POKEMON_NAME = 'pokemon-name';

describe('Test component Pokedex.js', () => {
  test('if the page contains a heading h2 with the text "Encountered pokemons".', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(title).toBeInTheDocument();
  });
});

describe('"Próximo pokémon" button test.', () => {
  test('if the button should contain the text "Próximo pokémon".', () => {
    renderWithRouter(<App />);
    const nextPokemonButton = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(nextPokemonButton).toBeInTheDocument();
  });
  test(`if the next Pokémon in the list are shown when
    clicking the button and if the first Pokémon in the list is
    shown when clicking the button, when it is in the last Pokémon in the list.`, () => {
    renderWithRouter(<App />);
    const nextPokemonButton = screen.getByRole('button', {
      name: NEXT_POKEMON,
    });
    const pokemonName = screen.getByTestId(POKEMON_NAME);
    expect(pokemonName).toHaveTextContent('Pikachu');
    userEvent.click(nextPokemonButton);
    expect(pokemonName).toHaveTextContent('Charmander');
    userEvent.click(nextPokemonButton);
    expect(pokemonName).toHaveTextContent('Caterpie');
    userEvent.click(nextPokemonButton);
    expect(pokemonName).toHaveTextContent('Ekans');
    userEvent.click(nextPokemonButton);
    expect(pokemonName).toHaveTextContent('Alakazam');
    userEvent.click(nextPokemonButton);
    expect(pokemonName).toHaveTextContent('Mew');
    userEvent.click(nextPokemonButton);
    expect(pokemonName).toHaveTextContent('Rapidash');
    userEvent.click(nextPokemonButton);
    expect(pokemonName).toHaveTextContent('Snorlax');
    userEvent.click(nextPokemonButton);
    expect(pokemonName).toHaveTextContent('Dragonair');
    userEvent.click(nextPokemonButton);
    expect(pokemonName).toHaveTextContent('Pikachu');
  });
  test('if only one Pokemon is shown at a time.', () => {
    renderWithRouter(<App />);
    const nextPokemonButton = screen.getByRole('button', {
      name: NEXT_POKEMON,
    });
    const pokemonName = screen.getAllByTestId(POKEMON_NAME);
    expect(pokemonName.length).toBe(1);
    userEvent.click(nextPokemonButton);
    expect(pokemonName.length).toBe(1);
  });
});

describe('Test if the Pokédex has the filter buttons.', () => {
  test(`if there is a filtering button for
    each type of Pokémon, without repetition.`, () => {
    renderWithRouter(<App />);
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const numberOfButtons = 7;
    expect(filterButtons.length).toBe(numberOfButtons);
    expect(filterButtons[0]).toHaveTextContent('Electric');
    expect(filterButtons[1]).toHaveTextContent('Fire');
    expect(filterButtons[2]).toHaveTextContent('Bug');
    expect(filterButtons[3]).toHaveTextContent('Poison');
    expect(filterButtons[4]).toHaveTextContent('Psychic');
    expect(filterButtons[5]).toHaveTextContent('Normal');
    expect(filterButtons[6]).toHaveTextContent('Dragon');
  });
  test(`if from the selection of a type button, the Pokédex
    cycles only through the Pokémon of that type.`, () => {
    renderWithRouter(<App />);
    const buttonsElectric = screen.getByRole('button', { name: 'Electric' });
    const buttonsFire = screen.getByRole('button', { name: 'Fire' });
    const buttonsBug = screen.getByRole('button', { name: 'Bug' });
    const buttonsPoison = screen.getByRole('button', { name: 'Poison' });
    const buttonsPsychic = screen.getByRole('button', { name: 'Psychic' });
    const buttonsNormal = screen.getByRole('button', { name: 'Normal' });
    const buttonsDragon = screen.getByRole('button', { name: 'Dragon' });

    const typeOfPokemon = screen.getByTestId('pokemon-type');

    userEvent.click(buttonsElectric);
    expect(typeOfPokemon).toHaveTextContent('Electric');
    userEvent.click(buttonsFire);
    expect(typeOfPokemon).toHaveTextContent('Fire');
    userEvent.click(buttonsBug);
    expect(typeOfPokemon).toHaveTextContent('Bug');
    userEvent.click(buttonsPoison);
    expect(typeOfPokemon).toHaveTextContent('Poison');
    userEvent.click(buttonsPsychic);
    expect(typeOfPokemon).toHaveTextContent('Psychic');
    userEvent.click(buttonsNormal);
    expect(typeOfPokemon).toHaveTextContent('Normal');
    userEvent.click(buttonsDragon);
    expect(typeOfPokemon).toHaveTextContent('Dragon');

    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
  });
});

describe('Test if the Pokédex contains a button to reset the filter', () => {
  test('if The button text is All.', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
  });
  test(`if Pokedéx shows Pokémon normally
    (without filters) when All button is clicked.`, () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: 'All' });
    userEvent.click(buttonAll);
    const nameOfPokemon = screen.getByTestId(POKEMON_NAME);
    expect(nameOfPokemon).toHaveTextContent('Pikachu');
  });
});
