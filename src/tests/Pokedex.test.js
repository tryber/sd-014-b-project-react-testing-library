import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import data from '../data';

describe('Teste se página contém um heading h2', () => {
  it('Com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const h2 = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
      exact: false,
    });

    expect(h2).toBeInTheDocument();
  });
});

describe(`Teste se é exibido o próximo Pokémon da lista quando o botão Próximo 
pokémon é clicado`, () => {
  it('O botão deve conter o texto Próximo pokémon', () => {
    renderWithRouter(<App />);

    const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });

    expect(buttonNext).toHaveTextContent(/próximo pokémon/i);
  });

  it('Os próximos Pokémons da lista devem ser mostrados, um por vez', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getAllByText(/Average weight/i);

    expect(pokemon).toHaveLength(1);
  });

  it('O primeiro Pokémon da lista deve ser mostrado ao clicar no botão', () => {
    renderWithRouter(<App />);

    const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(buttonNext).toBeInTheDocument();

    userEvent.click(buttonNext);

    const nextPokemon = screen.getByText(/charmander/i);
    expect(nextPokemon).toBeInTheDocument();
  });
});
describe('Teste se a Pokédex tem os botões de filtro.', () => {
  it(`Deve existir um botão de filtragem para cada tipo de Pokémon
  , sem repetição.`, () => {
    renderWithRouter(<App />);

    const buttonsByElements = screen.getAllByTestId('pokemon-type-button');
    const elementsPokemons = 7;

    expect(buttonsByElements).toHaveLength(elementsPokemons);
  });
  it(`A partir da seleção de um botão de tipo, a Pokédex deve circular somente 
  pelos pokémons daquele tipo`, () => {
    renderWithRouter(<App />);

    const typeButton = screen.getByRole('button', { name: /Fire/i });
    userEvent.click(typeButton);

    const pokemonFilterByType = data.filter(({ type }) => type === typeButton.innerHTML);
    expect(pokemonFilterByType).toHaveLength(2);

    const pokemonByType = screen.getByText(/charmander/i);
    expect(pokemonByType).toBeInTheDocument();
  });
});

describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  it('O texto do botão deve ser All', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: /All/i });
    expect(buttonAll).toBeInTheDocument();
  });
  it(`A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão 
  All for clicado`, () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: /All/i });

    userEvent.click(buttonAll);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});

describe('', () => {
  it('', () => {
    renderWithRouter(<App />);
  });
});
