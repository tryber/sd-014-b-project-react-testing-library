import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../uteis/renderWithRouter';
import App from '../App';
import Pokemons from '../data';

describe('Testa o component Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('se página contém um heading h2 com o texto "Encountered pokémons".', () => {
    const titlePokedex = screen.getByRole('heading',
      { level: 2, name: 'Encountered pokémons' });
    expect(titlePokedex).toBeInTheDocument();
  });

  test('se existe um bottão com o texto "Próximo pokémon".', () => {
    const buttonNextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(buttonNextPokemon).toBeInTheDocument();
  });

  test(`se os próximos Pokémons da lista aparecem,
  um a um, ao clicar sucessivamente no botão`, () => {
    const buttonNextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(buttonNextPokemon).toBeInTheDocument();
    Pokemons.forEach((pokemon) => {
      const namePokemon = screen.getByTestId('pokemon-name');
      expect(namePokemon).toHaveTextContent(pokemon.name);
      userEvent.click(buttonNextPokemon);
    });
  });

  test('se existe um botão de filtragem para cada tipo de Pokémon', () => {
    Pokemons.forEach((pokemon) => {
      const typePokemon = screen.getByRole('button', { name: pokemon.type });
      expect(typePokemon).toHaveTextContent(pokemon.type);
    });
  });

  test('se cada um dos botões de filtros funcionam ao clique', () => {
    const testIdTypeButton = screen.getAllByTestId('pokemon-type-button');
    testIdTypeButton.forEach((type) => {
      userEvent.click(type);
      expect(type).toBeInTheDocument();
    });
  });

  test('se o botão "All" está na tela', () => {
    const buttonAll = screen.getByRole('button', { name: /all/i });
    // Consultei o repositório do Naesser https://github.com/nasseralm de onde tirei a instpiração para usar o userEvent para clicar no botão All.
    userEvent.click(buttonAll);
    expect(buttonAll).toBeInTheDocument();
  });
});
