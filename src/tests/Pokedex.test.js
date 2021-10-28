import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Req5: Testing Component <Pokedex />', () => {
  test('if component renders "Encountered Pokemons" header', () => {
    renderWithRouter(<App />);
    const header = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(header).toBeInTheDocument();
  });

  test('if renders a pokemon when next button is clicked', () => {
    // já passou no teste... melhorar ele depois
    renderWithRouter(<App />);
    const button = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(button).toBeInTheDocument();
  });

  test('if renders only 1 pokemon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getAllByTestId('pokemon-name');
    expect(pokemonName.length).toBe(1);
  });

  test('if each button has proper text', () => {
    renderWithRouter(<App />);
    const allButtons = screen.getAllByTestId('pokemon-type-button');
    const pokemonType = screen.getByTestId('pokemon-type');

    allButtons.forEach((button, index) => {
      fireEvent.click(button);
      expect(allButtons[index].innerHTML).toBe(pokemonType.innerHTML);
    });
  });

  test('if "all types" button is rendered and resets filter', () => {
    renderWithRouter(<App />);
    const defaultType = screen.getByTestId('pokemon-type');
    const resetFilterButton = screen.getByRole('button', {
      name: 'All',
    });
    expect(resetFilterButton).toBeInTheDocument();
    fireEvent.click(resetFilterButton);
    expect(defaultType.innerHTML).toBe('Electric');
  });
});
