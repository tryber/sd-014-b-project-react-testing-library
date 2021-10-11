import React from 'react';
import { screen } from '@testing-library/react';
// import Pokedex from '../components/Pokedex';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

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

  it('Se o próximo pokemon é o Charmander', () => {
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
    const buttonAll = screen.getByRole('button', {
      name: 'All',
    });
    expect(buttonAll).toBeInTheDocument();
  });

  it(`Deve existir um botão de filtragem para cada tipo de Pokémon,
    sem repetição. verificando se no total tem 9 botões.`, () => {
    renderWithRouter(<App />);
    const buttonType = screen.getAllByRole('button');
    const NOVE = 9;
    expect(buttonType.length).toBe(NOVE);
  });
});
