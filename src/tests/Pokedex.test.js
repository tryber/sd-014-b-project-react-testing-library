import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import { Pokedex } from '../components';
import pokemons from '../data';

const isPokemonFavoriteById = { 25: true }; // Pikachu

describe('Testa a funcionalidade do componente Pokedex', () => {
  it('verifica heading h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const heading = screen.getByRole('heading', {
      level: 2, name: /Encountered pokémons/i });
    expect(heading).toBeInTheDocument();
  });

  it('ao click do botão "Próximo pokémon" o próximo Pokémon da lista é exibido', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();

    const next = screen.getByTestId('next-pokemon');
    userEvent.click(next);

    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();
  });

  it(' é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const one = 1;
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon).toHaveLength(one);
  });

  it('a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const buttons = 7;
    const buttonsFilter = screen.getAllByTestId('pokemon-type-button');
    expect(buttonsFilter).toHaveLength(buttons);

    const filterFire = screen.getByRole('button', { name: /Fire/i });
    expect(filterFire).toBeInTheDocument();

    userEvent.click(filterFire);

    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();
  });

  it('a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const resetFilter = screen.getByRole('button', { name: /All/i });
    expect(resetFilter).toBeInTheDocument();

    userEvent.click(resetFilter);

    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
});
