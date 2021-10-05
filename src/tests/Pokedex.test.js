import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 5 - Pokedex test', () => {
  test('Se a página contém um heading h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const pokedexHeading = screen.getByRole('heading', {
      level: 2, name: 'Encountered pokémons' });
    expect(pokedexHeading).toBeInTheDocument();
  });

  test('Se é exibido o próximo Pokémon quando o botão "Próximo" é clicado', () => {
    renderWithRouter(<App />);
    const pokemonButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(pokemonButton).toBeInTheDocument();
    userEvent.click(pokemonButton);
  });
  test('Se é exibido um Pokemón por vez', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getAllByTestId('pokemon-name');
    expect(pokemonName.length).toBe(1);
  });
  // Ref: https://github.com/tryber/sd-014-b-project-react-testing-library/pull/1/files
  test('Se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const quantButton = 7;
    const pokemonFilterButton = screen.getAllByTestId('pokemon-type-button');
    expect(pokemonFilterButton.length).toBe(quantButton);

    const typeButton = screen.getByRole('button', { name: 'Psychic' });
    expect(typeButton).toBeInTheDocument();
  });
  test('se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const resetButton = screen.getByRole('button', { name: 'All' });
    expect(resetButton).toBeInTheDocument();

    userEvent.click(resetButton);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');
  });
});
