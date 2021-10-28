import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);

    const header = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(header).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado.', () => {
    renderWithRouter(<App />);

    const nextBtn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    const clicks = 9;

    for (let index = 0; index < clicks; index += 1) {
      userEvent.click(nextBtn);
    }

    const nextPokemon = screen.getByText(/pikachu/i);
    expect(nextPokemon).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemon = [screen.getByText(/average weight/i)];
    expect(pokemon.length).toBe(1);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    expect(filterButtons[0].innerHTML).toBe('Electric');
    expect(filterButtons[1].innerHTML).toBe('Fire');
    expect(filterButtons[2].innerHTML).toBe('Bug');
    expect(filterButtons[3].innerHTML).toBe('Poison');
    expect(filterButtons[4].innerHTML).toBe('Psychic');
    expect(filterButtons[5].innerHTML).toBe('Normal');
    expect(filterButtons[6].innerHTML).toBe('Dragon');
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const resetBtn = screen.getByRole('button', {
      name: 'All',
    });
    userEvent.click(resetBtn);
    expect(resetBtn).toBeInTheDocument();
  });
});
