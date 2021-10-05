import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente <Pokedex.js>', () => {
  test('Verifica se a página contém um h2 com o texto "Encountered pokémon"', () => {
    renderWithRouter(<App />);
    const titlePokedex = screen.getByRole('heading', { level: 2 });
    expect(titlePokedex).toHaveTextContent('Encountered pokémons');
  });

  test('Verifica a funcionalidade do botão "Próximo pokémon"', () => {
    renderWithRouter(<App />);
    const buttonNextPok = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(buttonNextPok).toBeDefined();

    let index = 0;
    while (index < pokemons.length - 1) {
      const namePoke = screen.getByTestId('pokemon-name');
      expect(namePoke.textContent).toBe(pokemons[index].name);
      index += 1;
      userEvent.click(buttonNextPok);
    }
  });

  test('Verifica se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const getAllPokemons = screen.getAllByRole('img');
    expect(getAllPokemons).toHaveLength(1);
  });

  test('Verifica a funcionalidade dos filtros "buttons"', () => {
    renderWithRouter(<App />);
    const filters = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const getAllFilters = screen.queryAllByTestId('pokemon-type-button');
    for (let i = 0; i < filters.length - 1; i += 1) {
      expect(getAllFilters[i].textContent).toStrictEqual(filters[i]);
    }
  });

  test('Verifica a funcionalidade do botão "All"', () => {
    renderWithRouter(<App />);
    const bntAll = screen.getByRole('button', { name: 'All' });
    expect(bntAll).toBeInTheDocument();
    userEvent.click(bntAll);
  });
});
