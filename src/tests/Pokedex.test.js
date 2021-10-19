import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente Pokedex', () => {
  it('este se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const pokedexHeading = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(pokedexHeading).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon ao clicar em "Próximo pokémon"', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByText(/Próximo pokémon/i);
    expect(nextButton).toBeInTheDocument();
    userEvent.click(nextButton);
    const nextPokemon = screen.getByText(/Charmander/i);
    expect(nextPokemon).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const currentPokemon = screen.getAllByTestId('pokemon-name');

    expect(currentPokemon).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    const SEVEN = 7;
    expect(typeButtons).toHaveLength(SEVEN);

    const poisonButton = screen.getByText(/Poison/);
    userEvent.click(poisonButton);
    const poisonPokemon = screen.getByText(/Ekans/i);
    expect(poisonPokemon).toBeInTheDocument();

    const buttonAll = screen.getByText(/All/);
    expect(buttonAll).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonReset = screen.getByText(/All/);

    userEvent.click(buttonReset);
    const resetedList = screen.getByText(/Pikachu/i);
    expect(resetedList).toBeInTheDocument();
  });
});
