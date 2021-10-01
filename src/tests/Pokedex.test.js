import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Pokedex from '../components/Pokedex';

const { pokemonsApi, pokemonFavoritId } = require('./pokemonsApi');

test('Se possui um título "Encountered pokémons"', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <Pokedex
        isPokemonFavoriteById={ pokemonFavoritId }
        pokemons={ pokemonsApi }
      />
    </Router>,
  );

  const title = screen.getByRole('heading', {
    name: /Encountered pokémons/i,
    level: 2,
  });

  expect(title).toBeInTheDocument();
});

test('O funcionamento do botão "Próximo pokémon"', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <Pokedex
        isPokemonFavoriteById={ pokemonFavoritId }
        pokemons={ pokemonsApi }
      />
    </Router>,
  );

  const button = screen.getByRole('button', {
    name: /Próximo pokémon/i,
  });

  const pokemonName = screen.getByTestId('pokemon-name');
  pokemonsApi.forEach((pokemon) => {
    expect(pokemonName.innerHTML).toEqual(pokemon.name);
    userEvent.click(button);
  });
  expect(pokemonName.innerHTML).toEqual(pokemonsApi[0].name);
});

test('Se exibe apenas um poquemo por vez', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <Pokedex
        isPokemonFavoriteById={ pokemonFavoritId }
        pokemons={ pokemonsApi }
      />
    </Router>,
  );

  const pokemonCard = screen.getAllByTestId('pokemon-name');
  expect(pokemonCard.length).toBe(1);
});

test('Test o filtro dos botões', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <Pokedex
        isPokemonFavoriteById={ pokemonFavoritId }
        pokemons={ pokemonsApi }
      />
    </Router>,
  );
  const buttonsType = screen.getAllByTestId('pokemon-type-button');
  const pokemonType = screen.getByTestId('pokemon-type');
  buttonsType.forEach((button) => {
    userEvent.click(button);
    if (button.innerHTML === 'All') {
      expect(pokemonType.innerHTML).toBe(/Electric/i);
    }
    expect(button.innerHTML).toBe(pokemonType.innerHTML);
  });
});

test('Ao clicar no botão "All" o filtro é limpo', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <Pokedex
        isPokemonFavoriteById={ pokemonFavoritId }
        pokemons={ pokemonsApi }
      />
    </Router>,
  );
  const allButton = screen.getByRole('button', {
    name: /All/i,
  });

  userEvent.click(allButton);
  const type = screen.getByTestId('pokemon-type');
  expect(type.innerHTML).toEqual('Electric');
});
