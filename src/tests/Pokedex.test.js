import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './renderWithRouter';
import Pokemons from '../data';

describe('Testa o componente <Pokedex.js />', () => {
  it('Testa se página contém um heading h2 com o texto: Encountered pokémons', () => {
    renderWithRouter(<App />);

    const h2Pokedex = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/,
    });
    expect(h2Pokedex).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da'
  + 'lista quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });

    userEvent.click(button);
    expect(button).toBeInTheDocument();

    const pokemon = screen.getByText('Charmander');
    expect(pokemon).toBeInTheDocument();
  });

  it('Testa se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);

    const pokemonRender = screen.getAllByTestId('pokemon-name');

    expect(pokemonRender.length).toBe(1);
  });

  it('Testa se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const BUTTONS_LENGTH = 7;

    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();

    const pokemonsTypeButtons = screen.getAllByTestId('pokemon-type-button');
    expect(pokemonsTypeButtons.length).toBe(BUTTONS_LENGTH);

    Pokemons.forEach(({ type }) => {
      const typeButton = screen.getByRole('button', { name: `${type}` });
      expect(typeButton).toBeInTheDocument();
    });
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();

    userEvent.click(allButton);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
