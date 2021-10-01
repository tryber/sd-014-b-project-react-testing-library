import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokedex } from '../components';
import pokemons from '../data';

const renderWithRouter = () => {
  const history = createMemoryHistory();
  return (
    render(
      <Router history={ history }>
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ { isPokemonFavoriteById: true } }
        />
      </Router>,
    )
  );
};

describe('Testa se o componente Pokedex:', () => {
  test('contém um heading com texto "Encountered pokémons" ', () => {
    renderWithRouter();
    const heading = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(heading).toBeInTheDocument();
  });

  test('O próximo Pokémon é listado quando o botão é clicado', () => {
    renderWithRouter();
    const buttonNextPoke = screen.getByText('Próximo pokémon');
    expect(buttonNextPoke).toBeInTheDocument();
    const firstPoke = screen.getByText(pokemons[0].name);
    expect(firstPoke).toBeInTheDocument();
    userEvent.click(buttonNextPoke);
    const secondPoke = screen.getByText(pokemons[1].name);
    expect(secondPoke).toBeInTheDocument();
  });

  test('É mostrado apenas um pokemon por vez', () => {
    renderWithRouter();
    const NUM_OF_ACTUAL_POKE = 1;
    const pokemonLink = screen.getAllByRole('link', { name: 'More details' });
    expect(pokemonLink.length).toBe(NUM_OF_ACTUAL_POKE);
  });

  test('contem os botões de filto', () => {
    renderWithRouter();
    const NUM_OF_TYPE_BUTTONS = 7;
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    expect(typeButtons.length).toBe(NUM_OF_TYPE_BUTTONS);
    expect(typeButtons[0]).toHaveTextContent('Electric');

    const nextPokeTestId = 'next-pokemon';

    expect(screen.getByTestId(nextPokeTestId)).toBeEnabled();

    const poisonButton = screen.getByRole('button', { name: 'Poison' });
    userEvent.click(poisonButton);
    const ekansPoke = screen.getByText('Ekans');
    expect(ekansPoke).toBeInTheDocument();

    userEvent.click(typeButtons[0]);
    expect(screen.getByTestId(nextPokeTestId)).toBeDisabled();
    userEvent.click(typeButtons[2]);
    expect(screen.getByTestId(nextPokeTestId)).toBeDisabled();
    userEvent.click(typeButtons[4]);
    expect(screen.getByTestId(nextPokeTestId)).toBeEnabled();
  });

  test('contém um botão para resetar o filtro', () => {
    renderWithRouter();
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();

    const nextPoke = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(nextPoke);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Fire');
    userEvent.click(nextPoke);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Bug');
  });
});
