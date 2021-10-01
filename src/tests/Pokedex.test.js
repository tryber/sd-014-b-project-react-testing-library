import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Helpers/RenderRouter';
import App from '../App';
import pokemons from '../data';

describe('O componente Pokedex:', () => {
  const POKEMON_NAME = 'pokemon-name';
  const NEXT_POKEMON = 'Próximo pokémon';

  it('deve conter um título com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const mainTitle = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(mainTitle).toBeInTheDocument();
  });

  it('deve conter um botão de próximo pokemon que exibe o próximo pokemon', () => {
    renderWithRouter(<App />);

    const nextPokemonButton = screen.getByRole('button', { name: NEXT_POKEMON });
    expect(nextPokemonButton).toBeInTheDocument();

    pokemons.forEach((poke) => {
      const currentPokemonName = screen.getByTestId(POKEMON_NAME);
      expect(currentPokemonName.textContent).toBe(poke.name);
      const typeCurrentPokemon = screen.getByTestId('pokemon-type');
      expect(typeCurrentPokemon.textContent).toBe(poke.type);
      userEvent.click(nextPokemonButton);
    });
  });

  it('deve ser mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);

    const nextPokemonButton = screen.getByRole('button', { name: NEXT_POKEMON });
    expect(nextPokemonButton).toBeInTheDocument();

    const pokemonName = screen.getAllByTestId(POKEMON_NAME);
    expect(pokemonName.length).toBe(1);
  });

  it('deve conter botões para cada tipo de pokémon', () => {
    renderWithRouter(<App />);

    const allTypeButton = screen.getByRole('button', { name: 'All' });
    expect(allTypeButton).toBeInTheDocument();

    pokemons.forEach((poke) => {
      const pokemonTypeButton = screen.getAllByTestId('pokemon-type-button');
      const pokeType = screen.getByRole('button', { name: poke.type });
      expect(pokeType.textContent).toBe(poke.type);
      pokemonTypeButton.forEach((eachButton) => {
        expect(eachButton).toBeInTheDocument();
      });
    });

    userEvent.click(allTypeButton);
    pokemons.forEach((poke) => {
      const nextPokemonButton = screen.getByRole('button', { name: NEXT_POKEMON });
      const currentPokemonName = screen.getByTestId(POKEMON_NAME);
      expect(currentPokemonName).toBeInTheDocument();
      expect(currentPokemonName.textContent).toBe(poke.name);
      userEvent.click(nextPokemonButton);
    });
  });
});
