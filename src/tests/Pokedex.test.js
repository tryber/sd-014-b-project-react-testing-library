import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa se o componente Pokedex.js', () => {
  test('Verifica a Heading', () => {
    renderWithRouter(<App />);

    const getHeading = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(getHeading).toBeInTheDocument();
  });

  test('Verifica se o button "próximo pokémon" funciona propriamente', () => {
    renderWithRouter(<App />);

    const getButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(getButton).toBeInTheDocument();
    const getPokémon = screen.getByText(/pikachu/i);
    expect(getPokémon).toBeInTheDocument();
    fireEvent.click(getButton);
    const getNextPokémon = screen.getByText(/charmander/i);
    expect(getNextPokémon).toBeInTheDocument();
    fireEvent.click(getButton);
    const getNextPokémon2 = screen.getByText(/caterpie/i);
    expect(getNextPokémon2).toBeInTheDocument();
  });

  test('Verifica aparece um pokemon por vez', () => {
    renderWithRouter(<App />);

    const getButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    const getPokémon = screen.getAllByText(/more details/i);
    expect(getPokémon.length).toBe(1);
    fireEvent.click(getButton);
    const getNextPokémon = screen.getAllByText(/more details/i);
    expect(getNextPokémon.length).toBe(1);
    fireEvent.click(getButton);
    const getNextPokémon2 = screen.getAllByText(/more details/i);
    expect(getNextPokémon2.length).toBe(1);
  });

  test('Testa se botões de filtro funcionam devidamente', () => {
    renderWithRouter(<App />);

    // Testa quantos botões de tipo existem
    const getButtons = screen.getAllByTestId('pokemon-type-button');
    expect(getButtons.length).toBe(2 * 2 * 2 - 1);

    // Testa se o pokemon apropriado aparece, dependendo do botão de tipo clicado
    fireEvent.click(getButtons[1]);
    const getTipeText = screen.getAllByText(/fire/i);
    expect(getTipeText.length).toBe(2);
    const getNext = screen.getByText(/próximo/i);
    fireEvent.click(getNext);
    const getNextTipeText = screen.getAllByText(/fire/i);
    expect(getNextTipeText.length).toBe(2);
  });

  test('Testa se o botão All funciona devidamente', () => {
    renderWithRouter(<App />);

    // Testa se renderiza de primeira com o All clicado
    screen.getByText(/pikachu/i);
    const getNext = screen.getByText(/próximo/i);
    fireEvent.click(getNext);
    screen.getByText(/charmander/i);

    // Testa se quando eu volto pro all, todos os pokemons carregam
    const getAll = screen.getByRole('button', { name: 'All' });
    const getButtons = screen.getAllByTestId('pokemon-type-button');
    fireEvent.click(getButtons[1]);
    fireEvent.click(getAll);
    screen.getByText(/pikachu/i);
    fireEvent.click(getNext);
    screen.getByText(/charmander/i);
  });
});
