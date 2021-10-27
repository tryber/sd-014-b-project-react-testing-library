import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Testing the component <Pokedex />', () => {
  const pokemonName = 'pokemon-name';
  const pokemonType = 'pokemon-type';
  const pokemonTypes = [
    ...new Set(pokemons.reduce((types, { type }) => [...types, type], [])),
  ];
  const verifyPokemonsOneByOne = (arrayOfPokemons, dataTestId, key) => {
    arrayOfPokemons.forEach((_pokemon, index, array) => {
      const nextPokemonBtn = screen.getByRole('button', { name: /próximo pokémon/i });
      userEvent.click(nextPokemonBtn);
      const pokemonBeingDisplayed = screen.getByTestId(dataTestId);
      const nextPokemonIndex = (index + 1) % array.length;
      expect(pokemonBeingDisplayed).toHaveTextContent(array[nextPokemonIndex][key]);
    });
  };
  describe('The Pokédex page', () => {
    it('should have a heading <h2> with the text "Encountered pokémons"', () => {
      renderWithRouter(<App />);
      expect(screen.getByRole('heading', { level: 2, name: /encountered pokémons/i }))
        .toBeInTheDocument();
    });
  });
  describe('The next pokemon button', () => {
    it('should have the text "Próximo pokémon"', () => {
      renderWithRouter(<App />);
      const nextPokemonBtn = screen.getByRole('button', { name: /próximo pokémon/i });
      expect(nextPokemonBtn).toBeInTheDocument();
    });
    it(`should display the next pokemon, one by one, when successively clicking
        on it`, () => {
      renderWithRouter(<App />);
      const firstPokemon = screen.getByTestId(pokemonName);
      expect(firstPokemon).toHaveTextContent(pokemons[0].name);
      verifyPokemonsOneByOne(pokemons, pokemonName, 'name');
    });
  });
  describe('Only one pokemon', () => {
    it('should be displayed at a time', () => {
      renderWithRouter(<App />);
      expect(screen.getAllByTestId(pokemonName)).toHaveLength(1);
    });
  });
  describe('The filter buttons', () => {
    it('should have only one filter button for each pokemon type', () => {
      renderWithRouter(<App />);
      pokemonTypes.forEach((type) => {
        expect(screen.getAllByRole('button', { name: type })).toHaveLength(1);
      });
    });
    it('should display only pokemons from the type of the selected filter', () => {
      renderWithRouter(<App />);
      pokemonTypes.forEach((type) => {
        const currentTypePokemons = pokemons.filter((pokemon) => pokemon.type === type);
        const currentTypeFilterBtn = screen.getByRole('button', { name: type });
        userEvent.click(currentTypeFilterBtn);
        verifyPokemonsOneByOne(currentTypePokemons, pokemonType, 'type');
      });
    });
    it('should have a text matching the pokemon type', () => {
      renderWithRouter(<App />);
      const filterByTypeBtns = screen.getAllByTestId('pokemon-type-button');
      filterByTypeBtns.forEach((filterBtn) => {
        userEvent.click(filterBtn);
        expect(screen.getByTestId(pokemonType)).toHaveTextContent(filterBtn.innerHTML);
      });
    });
    it('should always be visible the button "All"', () => {
      renderWithRouter(<App />);

      expect(screen.getByRole('button', { name: 'All' })).toBeVisible();
    });
  });
  describe('The reset filter button', () => {
    it('should have the text "All"', () => {
      renderWithRouter(<App />);
      expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    });
    it('should display all pokemons without any filter when clicked', () => {
      renderWithRouter(<App />);
      const filterByTypeFireBtn = screen.getByRole('button', { name: 'Fire' });
      const resetFilterBtn = screen.getByRole('button', { name: 'All' });
      userEvent.click(filterByTypeFireBtn);
      userEvent.click(resetFilterBtn);
      const firstPokemon = screen.getByTestId(pokemonName);
      expect(firstPokemon).toHaveTextContent(pokemons[0].name);
      verifyPokemonsOneByOne(pokemons, pokemonName, 'name');
    });
    it('should be the filter selected when the page is loaded', () => {
      renderWithRouter(<App />);

      verifyPokemonsOneByOne(pokemons, pokemonName, 'name');
    });
  });
});
