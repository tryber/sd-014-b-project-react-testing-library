import React from 'react';
import { screen } from '@testing-library/react';
// import Pokedex from '../components/Pokedex';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';
// import pokemons from '../data';

describe(' Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons',
    () => {
      renderWithRouter(<App />);
      const heading = screen.getByRole('heading', {
        level: 2,
        name: 'Encountered pokémons',
      });
      expect(heading).toBeInTheDocument();
    });

  it(`Teste se é exibido o próximo Pokémon da lista quando
    o botão Próximo pokémon é clicado`, () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(nextButton).toBeInTheDocument();
    userEvent.click(nextButton);
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pokemonArray = screen.getAllByTestId('pokemon-name');
    expect(pokemonArray.length).toBe(1);
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', {
      name: 'All',
    });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
    const NOVE = 9;
    expect(pokemons.length).toBe(NOVE);
  });
});
