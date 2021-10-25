import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

const POKEMON_NAME = 'pokemon-name';

// Teste se é mostrado apenas um Pokémon por vez.

// Teste se a Pokédex tem os botões de filtro.

// Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.

// A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;

// O texto do botão deve corresponder ao nome do tipo, ex. Psychic;

// O botão All precisa estar sempre visível.

test('se página contém um heading h2 com o texto Encountered pokémons.', () => {
  const customHistory = createMemoryHistory();
  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );
  const texth2 = screen.getByRole('heading',
    { name: 'Encountered pokémons' });

  expect(texth2).toBeInTheDocument();
});

test(`se é exibido o próximo Pokémon da lista
 quando o botão Próximo pokémon é clicado.`, () => {
  const customHistory = createMemoryHistory();
  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );
  const buttonNextPokemon = screen.getByTestId('next-pokemon');

  expect(buttonNextPokemon).toContainHTML('Próximo pokémon');

  userEvent.click(buttonNextPokemon);

  const getNextPokemon = screen.getByTestId(POKEMON_NAME);

  expect(getNextPokemon).toContainHTML('Charmander');

  userEvent.click(buttonNextPokemon);
  userEvent.click(buttonNextPokemon);
  userEvent.click(buttonNextPokemon);
  userEvent.click(buttonNextPokemon);
  userEvent.click(buttonNextPokemon);
  userEvent.click(buttonNextPokemon);
  userEvent.click(buttonNextPokemon);
  userEvent.click(buttonNextPokemon);

  const getPikachu = screen.getByTestId(POKEMON_NAME);

  expect(getPikachu).toContainHTML('Pikachu');
});

test('se existe um botão de filtragem para cada tipo de Pokémon, sem repetição.', () => {
  const customHistory = createMemoryHistory();
  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );
  const getAllButtons = screen.getByRole('button', { name: 'Electric' });
  const getAllButtonsF = screen.getByRole('button', { name: 'Fire' });
  const getAllButtonsB = screen.getByRole('button', { name: 'Bug' });
  const getAllButtonsP = screen.getByRole('button', { name: 'Poison' });
  const getAllButtonsPsy = screen.getByRole('button', { name: 'Psychic' });
  const getAllButtonsN = screen.getByRole('button', { name: 'Normal' });
  const getAllButtonsD = screen.getByRole('button', { name: 'Dragon' });

  expect(getAllButtons).toContainHTML('Electric');
  expect(getAllButtonsF).toContainHTML('Fire');
  expect(getAllButtonsB).toContainHTML('Bug');
  expect(getAllButtonsP).toContainHTML('Poison');
  expect(getAllButtonsPsy).toContainHTML('Psychic');
  expect(getAllButtonsN).toContainHTML('Normal');
  expect(getAllButtonsD).toContainHTML('Dragon');
});

test('se ao clicar no botao circula somente pelos pokémons daquele tipo;', () => {
  const customHistory = createMemoryHistory();
  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );

  const getAllButtons = screen.getAllByTestId('pokemon-type-button');

  userEvent.click(getAllButtons[1]);

  const buttonNextPokemon = screen.getByTestId('next-pokemon');

  userEvent.click(buttonNextPokemon);

  const pokemonRapidash = screen.getByTestId(POKEMON_NAME);

  expect(pokemonRapidash).toContainHTML('Rapidash');

  const getButtonAll = screen.getByRole('button', { name: 'All' });

  userEvent.click(getButtonAll);
});
