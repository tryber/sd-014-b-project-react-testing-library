import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const POKEMON_NAME = 'pokemon-name';

describe('Teste o componente <Pokedex.js />', () => {
  test('Se página contém um heading h2 com o texto `Encountered pokémons`', () => {
    renderWithRouter(<App />);

    const h2 = screen.getByRole('heading', { level: 2, name: /Encountered pokémons/ });
    expect(h2).toBeInTheDocument();
  });

  test(
    'se é exibido o próximo Pokémon da lista quando o botão Próximo'
    + ' pokémon é clicado.',
    () => {
      renderWithRouter(<App />);

      const nextPokemonButton = screen
        .getByRole('button', { name: /Próximo pokémon/ });

      const currentPokemon = screen.getByTestId(POKEMON_NAME).textContent;
      userEvent.click(nextPokemonButton);
      const nextPokemon = screen.getByTestId(POKEMON_NAME).textContent;
      expect(currentPokemon).not.toEqual(nextPokemon);
    },
  );

  test('Se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);

    const showsOnlyOnePokemon = screen.getAllByTestId(POKEMON_NAME);

    expect(showsOnlyOnePokemon).toHaveLength(1);
  });

  test('se a Pokédex tem os botões de filtro.',
    () => {
      const typesOfPokemons = [
        'Electric',
        'Fire',
        'Bug',
        'Poison',
        'Psychic',
        'Normal',
        'Dragon',
      ];
      const quantityOfFilterButtons = 7;
      renderWithRouter(<App />);

      const pokemonTypeButtons = screen.getAllByTestId('pokemon-type-button');
      expect(pokemonTypeButtons).toHaveLength(quantityOfFilterButtons);

      typesOfPokemons.forEach((type) => {
        const pokemonTypeButton = screen.getByRole('button', { name: `${type}` });
        expect(pokemonTypeButton).toBeInTheDocument();
      });
    });

  test('se a Pokédex contém um botão para resetar o filtro.', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: /All/ });
    userEvent.click(buttonAll);
    expect(buttonAll).toBeInTheDocument();
  });
});
