import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente Pokedex', () => {
  test('se a página contém um heading h2 com texto `Encountered pokémons`', () => {
    renderWithRouter(<App />);
    const pokedexHeading = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(pokedexHeading).toBeInTheDocument();
  });

  test('se é exibido próximo Pokémon da lista quando btn Próx. pokémon é clicado', () => {
    renderWithRouter(<App />);
    const btnNextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(btnNextPokemon).toBeInTheDocument();
    const pokemonNameId = screen.getByTestId('pokemon-name');
    pokemons.forEach((pokemon, index) => {
      if (index === pokemons.length - 1) {
        expect(pokemonNameId.textContent).toBe(pokemon.name);
        userEvent.click(btnNextPokemon);
        expect(pokemonNameId.textContent).toBe(pokemons[0].name);
      } else {
        expect(pokemonNameId.textContent).toBe(pokemon.name);
        userEvent.click(btnNextPokemon);
      }
    });
  });

  test('se é mostrado um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const onlyOnePokemon = screen.queryAllByTestId('pokemon-name');
    expect(onlyOnePokemon).toHaveLength(1);
  });

  test('se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const typesOfPokemon = [
      'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const typeButton = screen.getAllByTestId('pokemon-type-button');
    expect(typeButton.length).toBe(typesOfPokemon.length);

    typeButton.map((button, index) => {
      expect(button).toBeInTheDocument();
      return expect(typeButton[index]).toHaveTextContent(typesOfPokemon[index]);
    });

    const bntAll = screen.getByRole('button', { name: 'All' });
    expect(bntAll).toBeInTheDocument();
  });

  test('se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const bntAll = screen.getByRole('button', { name: 'All' });
    expect(bntAll).toBeInTheDocument();
    userEvent.click(bntAll);
  });
});
