import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa a funcionalidade da página Pokedex', () => {
  it('testa se a página contem um h2', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(heading).toBeInTheDocument();
  });

  it('testa se o botão Próximo pokemon existe', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(button).toBeInTheDocument();
  });

  it('testa se ao clicar em next pokemon um novo renderiza', () => {
    renderWithRouter(<App />);
    const buttonNext = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(buttonNext);
    const nextPokemon = screen.getByText(/Charmander/i);
    expect(nextPokemon).toBeInTheDocument();
  });

  it('testa se existe um botão "All"', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: 'All' });
    userEvent.click(buttonAll);
    const currentPokemon = screen.getByText(/Pikachu/i);
    expect(currentPokemon).toBeInTheDocument();
    const currentType = screen.getAllByText(/Electric/i);
    expect(currentType.length).toBe(2);
  });

  it('testa se existe um botão para cada tipo', () => {
    renderWithRouter(<App />);
    const buttonsCount = 7;
    const typePokemon = screen.getAllByTestId('pokemon-type-button');
    expect(typePokemon.length).toBe(buttonsCount);
  });
});
