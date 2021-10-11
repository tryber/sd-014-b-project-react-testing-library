import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../RenderwithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente Pokedex.js', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const infos = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons' });
    expect(infos).toBeInTheDocument();
  });
  test('Teste o botão Próximo pokémon.', () => {
    renderWithRouter(<App />);
    const Button = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(Button).toBeInTheDocument();
    userEvent.click(Button);
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
  });
  test('Teste se é mostrado apenas UM Pokémon.', () => {
    renderWithRouter(<App />);
    const poke = screen.getAllByTestId('pokemon-name');
    expect(poke.length).toBe(1);
  });
  test('Teste se tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const buttons = screen.getByRole('button', { name: 'All' });
    expect(buttons).toBeInTheDocument();
    const length = 7;
    const typeButton = screen.getAllByTestId('pokemon-type-button');
    expect(typeButton.length).toBe(length);
    pokemons.forEach(({ type }) => {
      const buttonTname = screen.getByRole('button', {
        name: type,
      });
      expect(buttonTname).toBeInTheDocument();
    });
  });
  test('Teste se há contém o botão para resetar o filtro.', () => {
    renderWithRouter(<App />);
    const buttons = screen.getByRole('button', {
      name: 'All',
    });
    expect(buttons).toBeInTheDocument();
    userEvent.click(buttons);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
    const value = 9;
    expect(pokemons.length).toBe(value);
  });
});
