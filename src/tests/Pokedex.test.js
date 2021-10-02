// npx stryker run ./stryker/Pokedex.conf.json
import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

const testIdFromPokemonNameElement = 'pokemon-name';
const testIdFromBtnProximoPokemon = 'next-pokemon';

describe('testes na página Pokédex', () => {
  it('Deve conter um h2 com o texto:Encountered pokémons', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2.textContent).toBe('Encountered pokémons');
  });

  it('Deve ser mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    expect(screen.getAllByTestId(testIdFromPokemonNameElement)).toHaveLength(1);
  });
});

describe('testes do botão ´Próximo pokémon´ na página Pokédex', () => {
  it('Deve conter botão com o texto: Próximo pokémon', () => {
    renderWithRouter(<App />);
    const btnProximoPokemom = screen.getByTestId(testIdFromBtnProximoPokemon);
    expect(btnProximoPokemom.textContent).toBe('Próximo pokémon');
  });

  test('Clicar no botão exibe pokemons da lista um a um', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId(testIdFromPokemonNameElement);
    const btnProximoPokemom = screen.getByTestId(testIdFromBtnProximoPokemon);
    pokemons.forEach((pokemon) => {
      expect(pokemonName.textContent).toBe(pokemon.name);
      fireEvent.click(btnProximoPokemom);
    });
  });

  test('Clicar no botão após o ultimo pokémon exibe o primeiro pokémon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId(testIdFromPokemonNameElement);
    const btnProximoPokemom = screen.getByTestId(testIdFromBtnProximoPokemon);
    for (let index = 0; index < pokemons.length; index += 1) {
      fireEvent.click(btnProximoPokemom);
    }
    expect(pokemonName.textContent).toBe('Pikachu');
  });
});

describe('testes nos filtros de pokémons na página Pokédex', () => {
  it('Deve existir um unico botão de filtragem para cada tipo de pokémon', () => {
    renderWithRouter(<App />);
    const allButtonsType = screen.getAllByTestId('pokemon-type-button');
    expect(allButtonsType[0].textContent).toBe('Electric');
    expect(allButtonsType[1].textContent).toBe('Fire');
    expect(allButtonsType[2].textContent).toBe('Bug');
    expect(allButtonsType[3].textContent).toBe('Poison');
    expect(allButtonsType[4].textContent).toBe('Psychic');
    expect(allButtonsType[5].textContent).toBe('Normal');
    expect(allButtonsType[6].textContent).toBe('Dragon');
  });

  test('selecionar o tipo de pokémon, circula somente por pokémons daquele tipo', () => {
    renderWithRouter(<App />);

    const btnPokemonsTypeFire = screen.getByRole('button', { name: 'Fire' });
    fireEvent.click(btnPokemonsTypeFire);

    const firstPokemonName = screen.getByTestId(testIdFromPokemonNameElement);
    const firstPokemonType = screen.getByTestId('pokemon-type');
    expect(firstPokemonName.textContent).toBe('Charmander');
    expect(firstPokemonType.textContent).toBe('Fire');

    const btnProximoPokemom = screen.getByTestId(testIdFromBtnProximoPokemon);
    fireEvent.click(btnProximoPokemom);

    const secondPokemonName = screen.getByTestId(testIdFromPokemonNameElement);
    const secondPokemonType = screen.getByTestId('pokemon-type');
    expect(secondPokemonName.textContent).toBe('Rapidash');
    expect(secondPokemonType.textContent).toBe('Fire');
  });
});

describe('Testes no botão do All', () => {
  it('Precisa estar sempre visível e com o texto: All', () => {
    renderWithRouter(<App />);
    const btnTypeAll = screen.getByRole('button', { name: 'All' });
    expect(btnTypeAll).toBeEnabled();
  });

  const countAllPokemons = () => {
    const btnProximoPokemom = screen.getByTestId(testIdFromBtnProximoPokemon);
    let countPokemons = 0;
    for (; countPokemons < pokemons.length; countPokemons += 1) {
      fireEvent.click(btnProximoPokemom);
    }
    expect(countPokemons).toBe(pokemons.length);
  };

  it('Ao ser clicado deve ser possível circular por todos os pokémons', () => {
    renderWithRouter(<App />);
    const btnTypeAll = screen.getByRole('button', { name: 'All' });
    fireEvent.click(btnTypeAll);

    countAllPokemons();
  });

  it('Ao recarregar a página deve estar selecionado', () => {
    renderWithRouter(<App />);
    countAllPokemons();
  });
});
