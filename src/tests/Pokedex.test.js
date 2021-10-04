import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import App from '../App';

const literalPokemonName = 'pokemon-name';

describe('Testa o componente Pokedex.js', () => {
  test('se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);

    const heading = screen
      .getByRole('heading', { name: 'Encountered pokémons', level: 2 });

    expect(heading).toBeInTheDocument();
  });

  test('se é exibido o próximo Pokémon quando o botão Próximo pokémon é clicado.', () => {
    renderWithRouter(<App />);
    const pokemonsLength = 8;
    let pokemonName = screen.getByTestId(literalPokemonName);
    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });

    expect(pokemonName.innerHTML).toBe('Pikachu');

    userEvent.click(nextButton);
    pokemonName = screen.getByTestId(literalPokemonName);
    expect(pokemonName.innerHTML).toBe('Charmander');

    for (let index = 0; index < pokemonsLength; index += 1) {
      userEvent.click(nextButton);
    }
    pokemonName = screen.getByTestId(literalPokemonName);
    expect(pokemonName.innerHTML).toBe('Pikachu');
  });

  test('se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);

    const pokemonsNames = screen.getAllByTestId(literalPokemonName);

    expect(pokemonsNames.length).toBe(1);
  });

  test('se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const typesLength = 7;
    const allFilterBtn = screen.getByRole('button', { name: 'All' });

    const typeFilterBtns = screen.getAllByTestId('pokemon-type-button');
    expect(typeFilterBtns.length).toBe(typesLength);
    expect(allFilterBtn).toBeInTheDocument();

    userEvent.click(typeFilterBtns[1]);
    const pokemonType = screen.getByTestId('pokemon-type');

    expect(allFilterBtn).toBeInTheDocument();
    expect(pokemonType.innerHTML).toBe(typeFilterBtns[1].innerHTML);
  });

  test('se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allFilterBtn = screen.getByRole('button', { name: 'All' });
    const typeFilterBtns = screen.getAllByTestId('pokemon-type-button');

    expect(allFilterBtn).toBeInTheDocument();
    expect(allFilterBtn.innerHTML).toBe('All');

    userEvent.click(typeFilterBtns[1]);
    userEvent.click(allFilterBtn);

    expect(screen.getByTestId('pokemon-name').innerHTML).toBe('Pikachu');
  });
});
