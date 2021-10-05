import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import data from '../data';

const LENGTH_BUTTONS = 7;

describe('5 - Teste o componente Pokedex', () => {
  it('se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const title = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
      exact: false,
    });

    expect(title).toBeInTheDocument();
  });

  it('se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const showOnlyOnePokemon = screen.getAllByText(/Average weight/i);
    expect(showOnlyOnePokemon).toHaveLength(1);
  });

  it(`se é exibido o próximo Pokémon da lista quando o
   botão "Próximo pokémon" é clicado`, () => {
    renderWithRouter(<App />);

    const buttonNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(buttonNextPokemon).toBeInTheDocument();

    userEvent.click(buttonNextPokemon);

    const nextPokemon = screen.getByText(/charmander/i);
    expect(nextPokemon).toBeInTheDocument();
  });

  it('se é exibido o button "All"', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: /All/i });
    expect(buttonAll).toBeInTheDocument();
  });

  it('se ao clicar no botão "All", reseta os outros filtros', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: /All/i });
    expect(buttonAll).toBeInTheDocument();

    userEvent.click(buttonAll);

    const firstPokemon = screen.getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });

  it('se é exibido os buttons de filtros', () => {
    renderWithRouter(<App />);

    const buttonPokemonTypes = screen.getAllByTestId('pokemon-type-button');
    expect(buttonPokemonTypes).toHaveLength(LENGTH_BUTTONS);

    data.forEach(({ type }) => {
      const buttonFire = screen.getByRole('button', { name: `${type}` });
      expect(buttonFire).toBeInTheDocument();
    });
  });

  it('se é exibido os pokemons Fire, quando clicado no botão "Fire" ', () => {
    renderWithRouter(<App />);

    const buttonFire = screen.getByRole('button', { name: /Fire/i });
    userEvent.click(buttonFire);

    const PokemonsFires = data.filter(({ type }) => type === buttonFire.textContent);
    expect(PokemonsFires).toHaveLength(2);

    const namePokemon = screen.getByText(/charmander/i);
    expect(namePokemon).toBeInTheDocument();
  });
});
