import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Requisito 5', () => {
  test('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading',
      { level: 2, name: /Encountered pokémons/i });
    expect(heading).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(button.textContent).toBe('Próximo pokémon');

    pokemons.forEach((pokemon, i) => {
      const name = screen.getByText(pokemon.name);
      expect(name).toBeInTheDocument();
      userEvent.click(button);
      if (i === pokemons.length - 1) {
        i = 0;
        expect(name.textContent).toBe('Pikachu');
      }
    });
  });

  test('Se possui apenas um pokemon na tela', () => {
    renderWithRouter(<App />);
    const pokemonsOnScreen = screen.getAllByText(/Average weight/i);
    expect(pokemonsOnScreen.length).toBe(1);
  });

  test('Testa butões de filtro', () => {
    renderWithRouter(<App />);
    const buttonsType = screen.getAllByTestId('pokemon-type-button');
    buttonsType.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByText(/All/i);
    expect(buttonAll).toBeInTheDocument();
  });
});
