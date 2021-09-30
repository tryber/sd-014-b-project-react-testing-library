import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import data from '../data';

test('Testa se página contém um heading h2 com o texto "Encountered pokémons"', () => {
  renderWithRouter(<App />);

  const title = screen.getByRole('heading', { level: 2,
    name: 'Encountered pokémons',
  });
  expect(title).toBeInTheDocument();
});

test('Testa se é exibido o próximo pokémon da lista quando o botão é clicado', () => {
  renderWithRouter(<App />);

  const buttonNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
  expect(buttonNextPokemon).toBeInTheDocument();

  userEvent.click(buttonNextPokemon);

  const nextPokemon = screen.getByText(/charmander/i);
  expect(nextPokemon).toBeInTheDocument();
});

test('Testa se é exibido o button "All"', () => {
  renderWithRouter(<App />);

  const buttonAll = screen.getByRole('button', { name: /All/i });
  expect(buttonAll).toBeInTheDocument();
});

test('Testa se ao clicar no botão "All", reseta os outros filtros', () => {
  renderWithRouter(<App />);

  const buttonAll = screen.getByRole('button', { name: /All/i });
  expect(buttonAll).toBeInTheDocument();

  userEvent.click(buttonAll);

  const firstPokemon = screen.getByText(/pikachu/i);
  expect(firstPokemon).toBeInTheDocument();
});

test('Testa se é exibido os buttons de filtros', () => {
  renderWithRouter(<App />);
  const magic = 7;

  const buttonPokemonTypes = screen.getAllByTestId('pokemon-type-button');
  expect(buttonPokemonTypes).toHaveLength(magic);

  data.forEach(({ type }) => {
    const buttonFire = screen.getByRole('button', { name: `${type}` });
    expect(buttonFire).toBeInTheDocument();
  });
});

test('Testa se é exibido os pokemons Fire, quando clicado no botão "Fire" ', () => {
  renderWithRouter(<App />);

  const buttonFire = screen.getByRole('button', { name: /Fire/i });
  userEvent.click(buttonFire);

  const PokemonsFires = data.filter(({ type }) => type === buttonFire.textContent);
  expect(PokemonsFires).toHaveLength(2);

  const namePokemon = screen.getByText(/charmander/i);
  expect(namePokemon).toBeInTheDocument();
});
