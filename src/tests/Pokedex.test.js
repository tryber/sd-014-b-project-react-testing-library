import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import App from '../App';

const nextPokemon = 'next-pokemon';

describe('Testa a funcionalidade do componente Pokedex', () => {
  it('verifica heading h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const heading = screen.getByRole('heading', {
      level: 2, name: /encountered pokémons/i });
    expect(heading).toBeInTheDocument();
  });

  it('ao click do botão "Próximo pokémon" o próximo Pokémon da lista é exibido', () => {
    renderWithRouter(<App />);

    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();

    const next = screen.getByTestId(nextPokemon);
    expect(next).toBeInTheDocument();
    userEvent.click(next);

    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();
  });

  it(' é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const one = 1;
    const pokemon1 = screen.getAllByTestId('pokemon-name');
    expect(pokemon1).toHaveLength(one);

    const next = screen.getByTestId(nextPokemon);
    expect(next).toBeInTheDocument();
    userEvent.click(next);

    const pokemon2 = screen.getAllByTestId('pokemon-name');
    expect(pokemon2).toHaveLength(one);
  });

  it('a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const seven = 7;
    const buttonsFilter = screen.getAllByTestId('pokemon-type-button');
    expect(buttonsFilter).toHaveLength(seven);

    buttonsFilter.forEach((button) => {
      const textButton = button.textContent;
      const next = screen.getByTestId(nextPokemon);

      userEvent.click(button);

      const pokemonText = screen.getByTestId('pokemon-type').textContent;
      expect(pokemonText).toBe(textButton);

      userEvent.click(next);
    });
  });

  it('a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const resetFilter = screen.getByRole('button', { name: /All/i });
    expect(resetFilter).toBeInTheDocument();

    userEvent.click(resetFilter);

    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
});
