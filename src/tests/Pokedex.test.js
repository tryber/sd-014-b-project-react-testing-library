import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente Pokedex.js', () => {
  test(' se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });

    expect(title).toBeInTheDocument();
  });

  test(`se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon 
  é clicado`, () => {
    renderWithRouter(<App />);

    const nextPokemonButton = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(nextPokemonButton).toBeInTheDocument();

    fireEvent.click(nextPokemonButton);

    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
  });

  test('se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const renderPokemons = screen.getAllByTestId('pokemon-name');

    expect(renderPokemons.length).toBe(1);
  });

  test('se a Pokédex tem os botões de filtro', () => {
    const BUTTONS_LENGTH = 7;
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();

    const pokemonsTypeButtons = screen.getAllByTestId('pokemon-type-button');
    expect(pokemonsTypeButtons.length).toBe(BUTTONS_LENGTH);

    pokemons.forEach(({ type }) => {
      const typeButton = screen.getByRole('button', { name: `${type}` });
      expect(typeButton).toBeInTheDocument();
    });
  });

  test('se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();

    fireEvent.click(allButton);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
