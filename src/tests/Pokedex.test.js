import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Testa o componente Pokedex', () => {
  const nextBtnText = 'Próximo pokémon';
  test('a página deve conter um h2 com Encountered pokémons', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(h2).toBeInTheDocument();
  });

  test('o botão deve conter o texto Próximo pokémon', () => {
    renderWithRouter(<App />);

    const nextBtn = screen.getByText(nextBtnText);
    expect(nextBtn).toBeInTheDocument();
  });

  test(
    'o proximo pokemon deve ser exibido ao clicar no botão proximo pokemon varias vezes',
    () => {
      renderWithRouter(<App />);

      const nextBtn = screen.getByText(nextBtnText);
      for (let i = 1; i < pokemons.length; i += 1) {
        fireEvent.click(nextBtn);
        const pokemonElement = screen.getByText(pokemons[i].name);
        expect(pokemonElement).toBeInTheDocument();
      }
    },
  );

  test(
    `o primeiro Pokémon da lista deve ser mostrado ao clicar no botão,
    se estiver no último Pokémon da lista`,
    () => {
      renderWithRouter(<App />);

      const nextBtn = screen.getByText(nextBtnText);
      for (let i = 1; i < pokemons.length; i += 1) {
        fireEvent.click(nextBtn);
        const pokemonElement = screen.getByText(pokemons[i].name);
        expect(pokemonElement).toBeInTheDocument();
      }
      fireEvent.click(nextBtn);
      const pokemonElement = screen.getByText(pokemons[0].name);
      expect(pokemonElement).toBeInTheDocument();
    },
  );

  test('deve ser mostrado apenas um pokemon por vez', () => {
    renderWithRouter(<App />);
    const testIdName = 'pokemon-name';
    let pokemonElement = screen.getByTestId(testIdName);
    expect(pokemonElement).toHaveTextContent(pokemons[0].name);
    const nextBtn = screen.getByText(nextBtnText);
    fireEvent.click(nextBtn);
    expect(pokemonElement).not.toHaveTextContent(pokemons[0].name);

    pokemonElement = screen.getByTestId(testIdName);
    expect(pokemonElement).toHaveTextContent(pokemons[1].name);
    fireEvent.click(nextBtn);
    expect(pokemonElement).not.toHaveTextContent(pokemons[1].name);

    pokemonElement = screen.getByTestId(testIdName);
    expect(pokemonElement).toHaveTextContent(pokemons[2].name);
  });

  test('deve ser exibido os botões de filtro', () => {
    renderWithRouter(<App />);
    const types = [
      'Electric', 'Fire',
      'Bug', 'Poison',
      'Psychic', 'Psychic',
      'Fire', 'Normal',
      'Dragon',
    ];
    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(allBtn).toBeInTheDocument();
    types.forEach((type) => {
      const typeBtn = screen.getByRole('button', { name: type });
      expect(typeBtn).toBeInTheDocument();
    });
  });
});
