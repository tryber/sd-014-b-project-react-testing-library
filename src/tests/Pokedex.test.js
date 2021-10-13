import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(heading).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado.', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(nextButton).toBeInTheDocument();
    userEvent.click(nextButton);
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pokemonArray = screen.getAllByTestId('pokemon-name');
    expect(pokemonArray.length).toBe(1);
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', {
      name: 'All',
    });
    expect(allButton).toBeInTheDocument();
    const TYPE_ARRAY_LENGHT = 7;
    const typeButton = screen.getAllByTestId('pokemon-type-button');
    expect(typeButton.length).toBe(TYPE_ARRAY_LENGHT);
    pokemons.forEach(({ type }) => {
      const buttonTypeName = screen.getByRole('button', {
        name: type,
      });
      expect(buttonTypeName).toBeInTheDocument();
    });
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro.', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', {
      name: 'All',
    });
    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
    const NOVE = 9;
    expect(pokemons.length).toBe(NOVE);
  });
});
