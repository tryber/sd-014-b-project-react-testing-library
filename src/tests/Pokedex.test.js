import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';
import App from '../App';

beforeEach(() => RenderWithRouter(<App />));

describe('Testa o componente Pokedex.js', () => {
  test('se a página contém um heading h2 com o texto `Encountered pokémons`', () => {
    const title = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(title).toBeInTheDocument();
  });

  test(`se é exibido o próximo Pokémon da lista quando o botão Próximo
    pokémon é clicado`, () => {
    const firstPokemon = screen.getByText(/Pikachu/);
    expect(firstPokemon).toBeInTheDocument();

    const nextPokemonButton = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(nextPokemonButton).toBeInTheDocument();

    userEvent.click(nextPokemonButton);
    const secondPokemon = screen.getByText(/Charmander/);
    expect(secondPokemon).toBeInTheDocument();
  });

  test('se é mostrado apenas um Pokémon por vez', () => {
    const namePokemon = screen.getAllByText(/Average weight/);
    expect(namePokemon.length).toBe(1);
  });

  test('se a Pokédex tem os botões de filtro', () => {
    const NUMBER_OF_FILTERS = 7;
    const buttonElectric = screen.getByRole('button', { name: 'Electric' });
    expect(buttonElectric).toBeInTheDocument();

    const filterButton = screen.getAllByTestId('pokemon-type-button');
    expect(filterButton.length).toBe(NUMBER_OF_FILTERS);
  });

  test('se a Pokédex contém um botão para resetar o filtro', () => {
    const allButton = screen.getByRole('button', {
      name: 'All',
    });
    expect(allButton).toBeInTheDocument();

    userEvent.click(allButton);

    const namePokemon = screen.getByText(/Pikachu/);
    expect(namePokemon).toBeInTheDocument();
  });
});
