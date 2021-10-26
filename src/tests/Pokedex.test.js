import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokedex } from '../components';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

const favoritePokemonsMock = [{ id: 65, name: 'Alakazam', type: 'Psychic', averageWeight: { value: '48.0', measurementUnit: 'kg' }, image: 'https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png', moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Alakazam_(Pok%C3%A9mon)', foundAt: [{ location: 'Unova Accumula Town', map: 'https://cdn2.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png' }], summary: 'Closing both its eyes heightens all its other senses. This enables it to use its abilities to their extremes.' }, { id: 143, name: 'Snorlax', type: 'Normal', averageWeight: { value: '460.0', measurementUnit: 'kg' }, image: 'https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png', moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Snorlax_(Pok%C3%A9mon)', foundAt: [{ location: 'Kanto Vermillion City', map: 'https://cdn2.bulbagarden.net/upload/5/54/Kanto_Vermilion_City_Map.png' }], summary: 'What sounds like its cry may actually be its snores or the rumblings of its hungry belly.' }, { id: 148, name: 'Dragonair', type: 'Dragon', averageWeight: { value: '16.5', measurementUnit: 'kg' }, image: 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png', moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Dragonair_(Pok%C3%A9mon)', foundAt: [{ location: 'Johto Route 45', map: 'https://cdn2.bulbagarden.net/upload/2/21/Johto_Route_45_Map.png' }, { location: 'Johto Dragon\'s Den', map: 'https://cdn2.bulbagarden.net/upload/1/1e/Johto_Dragons_Den_Map.png' }], summary: 'They say that if it emits an aura from its whole body, the weather will begin to change instantly.' }];

describe('Tests the Pokedex.js application', () => {
  const pokemonName = 'pokemon-name';
  const nextPokemon = 'Próximo pokémon';
  test('page has a level 2 heading with the text `Encountered pokémons`', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemonsMock }
    />);
    const heading = screen.getByRole('heading', {
      level: 2, name: 'Encountered pokémons',
    });
    expect(heading).toBeInTheDocument();
  });
  test('next pokémon on the list is shown when the button is clicked', () => {
    renderWithRouter(<Pokedex
      pokemons={ favoritePokemonsMock }
      isPokemonFavoriteById={ favoritePokemonsMock }
    />);
    const button = screen.getByRole('button', { name: nextPokemon });
    let name = screen.getByTestId(pokemonName).textContent;
    expect(name).toBe('Alakazam');
    userEvent.click(button);
    name = screen.getByTestId(pokemonName).textContent;
    expect(name).toBe('Snorlax');
    userEvent.click(button);
    name = screen.getByTestId(pokemonName).textContent;
    expect(name).toBe('Dragonair');
    userEvent.click(button);
    name = screen.getByTestId(pokemonName).textContent;
    expect(name).toBe('Alakazam');
  });
  test('only one pokémon is shown by time', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemonsMock }
    />);
    const name = screen.getAllByTestId(pokemonName);
    const MAXIMUM_LENGTH = 1;
    expect(name.length).toBe(MAXIMUM_LENGTH);
  });
  test('has filter buttons', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemonsMock }
    />);
    const MAXIMUM_LENGTH_TYPE = 1;
    let button = screen.getAllByRole('button', { name: 'Electric' });
    expect(button.length).toBe(MAXIMUM_LENGTH_TYPE);
    button = screen.getAllByRole('button', { name: 'Fire' });
    expect(button.length).toBe(MAXIMUM_LENGTH_TYPE);
    button = screen.getAllByRole('button', { name: 'Bug' });
    expect(button.length).toBe(MAXIMUM_LENGTH_TYPE);
    button = screen.getAllByRole('button', { name: 'Poison' });
    expect(button.length).toBe(MAXIMUM_LENGTH_TYPE);
    button = screen.getAllByRole('button', { name: 'Psychic' });
    expect(button.length).toBe(MAXIMUM_LENGTH_TYPE);
    button = screen.getAllByRole('button', { name: 'Normal' });
    expect(button.length).toBe(MAXIMUM_LENGTH_TYPE);
    button = screen.getAllByRole('button', { name: 'Dragon' });
    expect(button.length).toBe(MAXIMUM_LENGTH_TYPE);
    const MAXIMUM_LENGTH_ALL = 7;
    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(buttons.length).toBe(MAXIMUM_LENGTH_ALL);
  });
  test('circulates through that type list when a filter is selected', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemonsMock }
    />);
    const typeButton = screen.getByRole('button', { name: 'Fire' });
    const nextButton = screen.getByRole('button', { name: nextPokemon });
    userEvent.click(typeButton);
    let name = screen.getByTestId(pokemonName).textContent;
    expect(name).toBe('Charmander');
    userEvent.click(nextButton);
    name = screen.getByTestId(pokemonName).textContent;
    expect(name).toBe('Rapidash');
    userEvent.click(nextButton);
    name = screen.getByTestId(pokemonName).textContent;
    expect(name).toBe('Charmander');
  });
  test('contains a reset filter button', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemonsMock }
    />);
    const typeButton = screen.getByRole('button', { name: 'Fire' });
    const nextButton = screen.getByRole('button', { name: nextPokemon });
    const allButton = screen.getByRole('button', { name: 'All' });
    let name = screen.getByTestId(pokemonName).textContent;
    expect(name).toBe('Pikachu');
    userEvent.click(typeButton);
    name = screen.getByTestId(pokemonName).textContent;
    expect(allButton).toBeVisible();
    expect(name).toBe('Charmander');
    userEvent.click(nextButton);
    name = screen.getByTestId(pokemonName).textContent;
    expect(allButton).toBeVisible();
    expect(name).toBe('Rapidash');
    userEvent.click(allButton);
    name = screen.getByTestId(pokemonName).textContent;
    expect(allButton).toBeVisible();
    expect(name).toBe('Pikachu');
  });
});
