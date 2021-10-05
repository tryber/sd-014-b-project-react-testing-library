import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import renderWithRouter from './renderWithRouter';
import { pokemons, isPokemonFavoriteById } from './PokemonMockAPI';

describe('Testa o componente "Pokedex"', () => {
  test('se página contém um heading "h2" com o texto "Encountered pokémons".', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const title = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(title).toBeInTheDocument();
  });

  test(`Teste se é exibido o próximo Pokémon da lista quando 
  o botão Próximo pokémon é clicado`, () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(nextButton);
    const pokemonName = screen.getByText('Charmander');
    expect(pokemonName).toBeInTheDocument();
    userEvent.click(nextButton);
    const nextPokemon = screen.getByText('Caterpie');
    expect(nextPokemon).toBeInTheDocument();
    for (let index = 0; index < pokemons.length - 2; index += 1) {
      userEvent.click(nextButton);
    }
    const firstPokemon = screen.getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();
  });

  test('se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const eletricBtn = screen.getByRole('button', { name: 'Electric' });
    const FireBtn = screen.getByRole('button', { name: 'Fire' });
    const bugBtn = screen.getByRole('button', { name: 'Bug' });
    const poisonBtn = screen.getByRole('button', { name: 'Poison' });
    const psychicBtn = screen.getByRole('button', { name: 'Psychic' });
    const normalBtn = screen.getByRole('button', { name: 'Normal' });
    const dragonBtn = screen.getByRole('button', { name: 'Dragon' });
    const allBtn = screen.getByRole('button', { name: 'All' });

    const buttons = screen.getAllByTestId('pokemon-type-button');
    const totalQuantityOfButtons = 7;
    expect(buttons).toHaveLength(totalQuantityOfButtons);
    expect(allBtn).toBeVisible();
    expect(eletricBtn).toBeInTheDocument();
    expect(bugBtn).toBeInTheDocument();
    expect(FireBtn).toBeInTheDocument();
    expect(poisonBtn).toBeInTheDocument();
    expect(psychicBtn).toBeInTheDocument();
    expect(normalBtn).toBeInTheDocument();
    expect(dragonBtn).toBeInTheDocument();
  });

  test('se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(allBtn).toBeVisible();
    expect(allBtn).toBeInTheDocument();
    userEvent.click(allBtn);
  });
});
