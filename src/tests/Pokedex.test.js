import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import App from '../App';

const nextPokemon = 'next-pokemon';

describe('Testa a funcionalidade do componente Pokedex', () => {
  it('verifica heading h2 com o texto "Encountered pokémons"', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/');

    const heading = screen.getByRole('heading', {
      level: 2, name: 'Encountered pokémons' });
    expect(heading).toBeInTheDocument();
  });

  it('ao click do botão "Próximo pokémon" o próximo Pokémon da lista é exibido', () => {
    renderWithRouter(<App />);

    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();

    const next = screen.getByText('Próximo pokémon');
    expect(next).toBeInTheDocument();

    userEvent.click(next);

    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();

    userEvent.click(next);

    const caterpie = screen.getByText('Caterpie');
    expect(caterpie).toBeInTheDocument();

    userEvent.click(next);

    const ekans = screen.getByText('Ekans');
    expect(ekans).toBeInTheDocument();

    userEvent.click(next);

    const alakazam = screen.getByText('Alakazam');
    expect(alakazam).toBeInTheDocument();

    userEvent.click(next);

    const mew = screen.getByText('Mew');
    expect(mew).toBeInTheDocument();

    userEvent.click(next);

    const rapidash = screen.getByText('Rapidash');
    expect(rapidash).toBeInTheDocument();

    userEvent.click(next);

    const snorlax = screen.getByText('Snorlax');
    expect(snorlax).toBeInTheDocument();

    userEvent.click(next);

    const dragonair = screen.getByText('Dragonair');
    expect(dragonair).toBeInTheDocument();

    userEvent.click(next);

    expect(pikachu).toBeInTheDocument();
  });

  it('mostra um Pokémon por vez', () => {
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

      const resetFilter = screen.getByRole('button', { name: /all/i });
      expect(resetFilter).toBeInTheDocument();

      const pokemonText = screen.getByTestId('pokemon-type');
      expect(pokemonText).toHaveTextContent(textButton);

      userEvent.click(next);
    });
  });

  it('verifica botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const resetFilter = screen.getByRole('button', { name: /All/i });
    expect(resetFilter).toBeInTheDocument();

    userEvent.click(resetFilter);

    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
});
