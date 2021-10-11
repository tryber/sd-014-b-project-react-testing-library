import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

const NEXT_POKE = 'next-pokemon';
const POKE_NAME = 'pokemon-name';

describe('Testa o componente Pokédex.js', () => {
  test('se a página contém um h2 com o texto "Encountered pokémons":', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByText('Encountered pokémons');
    expect(h2).toBeInTheDocument();
  });

  describe(`Testa se é exibido o próximo pokémon quando clicado no botão
  "Próximo Pokémon"`, () => {
    test('se o botão contém o texto "Próximo pokémon":', () => {
      renderWithRouter(<App />);
      const nextBtn = screen.getByTestId(NEXT_POKE);
      expect(nextBtn).toHaveTextContent('Próximo pokémon');
    });

    test('se ao clicar no botão os próximos pokémons são mostrados um a um', () => {
      renderWithRouter(<App />);
      const nextBtn = screen.getByTestId(NEXT_POKE);
      const currPokemon = screen.getByTestId(POKE_NAME);

      expect(currPokemon).toHaveTextContent('Pikachu');
      userEvent.click(nextBtn);
      expect(currPokemon).toHaveTextContent('Charmander');
      userEvent.click(nextBtn);
      expect(currPokemon).toHaveTextContent('Caterpie');
    });

    test('se ao terminar a lista, exibe o primeiro pokémon novamente:', () => {
      renderWithRouter(<App />);
      const nextBtn = screen.getByTestId(NEXT_POKE);
      const currPokemon = screen.getByTestId(POKE_NAME);
      const TOTAL_CLICKS = 9;

      for (let index = 0; index < TOTAL_CLICKS; index += 1) {
        userEvent.click(nextBtn);
      }

      expect(currPokemon).toHaveTextContent('Pikachu');
    });
  });

  test('se é mostrado apenas um pokémon por vez:', () => {
    renderWithRouter(<App />);
    const poke = screen.getAllByTestId(POKE_NAME);
    const nextBtn = screen.getByTestId(NEXT_POKE);

    expect(poke).toHaveLength(1);
    userEvent.click(nextBtn);
    expect(poke).toHaveLength(1);
  });

  describe('Testa se a Pokédex tem os botões de filtro', () => {
    const pokeTypes = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    test('se há os botões de filtro na página', () => {
      renderWithRouter(<App />);

      const typeButtons = screen.getAllByTestId('pokemon-type-button');
      const TYPE_LENGTH = 7;

      expect(typeButtons).toHaveLength(TYPE_LENGTH);
    });

    test(`se existe um botão para cada tipo de pokémon e o
    botão All está visível:`, () => {
      renderWithRouter(<App />);
      pokeTypes.forEach((type) => {
        const typeBtn = screen.getByRole('button', { name: type });
        const allBtn = screen.getByRole('button', { name: 'All' });

        expect(allBtn).toBeInTheDocument();
        expect(typeBtn).toBeInTheDocument();
        expect(typeBtn).toHaveTextContent(type);
      });
    });

    test('se ao clicar num tipo, somente tais pokémons são visualizados:', () => {
      renderWithRouter(<App />);
      pokeTypes.forEach((type) => {
        const currPokemon = screen.getByTestId('pokemon-type');
        const nextBtn = screen.getByTestId(NEXT_POKE);

        userEvent.click(screen.getByRole('button', { name: type }));
        expect(currPokemon).toHaveTextContent(type);

        userEvent.click(nextBtn);
        expect(currPokemon).toHaveTextContent(type);
      });
    });
  });

  describe('Testa se a Pokédex tem um botão pra resetar o filtro', () => {
    test('se o texto do botão é "All":', () => {
      renderWithRouter(<App />);
      const allBtn = screen.getByRole('button', { name: 'All' });

      expect(allBtn).toBeInTheDocument();
    });

    test(`se são mostrados pokémons sem filtros quando for clicado
no botão "All"`, () => {
      renderWithRouter(<App />);
      const allBtn = screen.getByRole('button', { name: 'All' });
      const nextBtn = screen.getByTestId(NEXT_POKE);
      const currPokeType = screen.getByTestId('pokemon-type');

      userEvent.click(allBtn);
      expect(currPokeType).toHaveTextContent('Electric');
      userEvent.click(nextBtn);
      expect(currPokeType).toHaveTextContent('Fire');
      userEvent.click(nextBtn);
      expect(currPokeType).toHaveTextContent('Bug');
    });
  });
});
