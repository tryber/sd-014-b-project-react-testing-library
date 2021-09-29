import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o card do Pokemon', () => {
  test('se o nome do pokemon é mostrado', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe('Pikachu');
  });

  test('se o peso é mostrado corretamente', () => {
    renderWithRouter(<App />);
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight.innerHTML).toBe('Average weight: 6.0 kg');
  });

  test('se o tipo é mostrado corretamente', () => {
    renderWithRouter(<App />);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.innerHTML).toBe('Electric');
  });
});
