import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

// ref: https://github.com/tryber/sd-014-b-project-react-testing-library/pull/60/files
describe('Req 5 - Testa o componente Pokedex', () => {
  it('Deve renderizar um heading h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const pokedexHeader = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(pokedexHeader).toBeInTheDocument();
  });

  it('Deve exibir o próximo Pokémon da lista'
    + 'quando o botão "Próximo pokémon" for clicado', () => {
    renderWithRouter(<App />);

    const proximoPokemonBtn = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(proximoPokemonBtn).toBeInTheDocument();
    userEvent.click(proximoPokemonBtn);
  });

  it('Deve renderizar apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getAllByTestId('pokemon-name');
    expect(pokemonName.length).toBe(1);
  });

  // ref: https://github.com/tryber/sd-014-b-project-react-testing-library/pull/1/files
  it('Deve renderizar os botões de filtro de Pokémons', () => {
    renderWithRouter(<App />);
    const numbersOfFilters = 7;
    const pokemonFilterBtn = screen.getAllByTestId('pokemon-type-button');
    expect(pokemonFilterBtn.length).toBe(numbersOfFilters);

    const bugBtn = screen.getByRole('button', {
      name: 'Bug',
    });
    expect(bugBtn).toBeInTheDocument();
  });

  it('Deve renderizar um botão com o texto "All" que reseta o filtro', () => {
    renderWithRouter(<App />);

    const allBtn = screen.getByRole('button', {
      name: 'All',
    });
    expect(allBtn).toBeInTheDocument();

    userEvent.click(allBtn);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');
  });
});
