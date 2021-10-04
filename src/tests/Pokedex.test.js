import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Testa o componente Pokedex', () => {
  const nextBtnText = 'Próximo pokémon';
  const testIdPokemonName = 'pokemon-name';
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
    let pokemonElement = screen.getByTestId(testIdPokemonName);
    expect(pokemonElement).toHaveTextContent(pokemons[0].name);
    const nextBtn = screen.getByText(nextBtnText);
    fireEvent.click(nextBtn);
    expect(pokemonElement).not.toHaveTextContent(pokemons[0].name);

    pokemonElement = screen.getByTestId(testIdPokemonName);
    expect(pokemonElement).toHaveTextContent(pokemons[1].name);
    fireEvent.click(nextBtn);
    expect(pokemonElement).not.toHaveTextContent(pokemons[1].name);

    pokemonElement = screen.getByTestId(testIdPokemonName);
    expect(pokemonElement).toHaveTextContent(pokemons[2].name);
  });

  test('o botão all deve mostrar todos os pokemons', () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(allBtn).toBeInTheDocument();
    const nextBtn = screen.getByRole('button', { name: nextBtnText });
    fireEvent.click(nextBtn);
    fireEvent.click(allBtn);
    const pokemonElement = screen.getByTestId(testIdPokemonName);
    expect(pokemonElement).toHaveTextContent(pokemons[0].name);
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
    const buttons = screen.getAllByTestId('pokemon-type-button');
    const BUTTONS_QUANTITY = 7;
    expect(buttons.length).toBe(BUTTONS_QUANTITY);
    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(allBtn).toBeInTheDocument();
    types.forEach((type) => {
      const typeBtn = screen.getByRole('button', { name: type });
      expect(typeBtn).toBeInTheDocument();
    });
  });
});
