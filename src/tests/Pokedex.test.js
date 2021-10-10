import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente Pokedex.js', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('deve conter um h2 com o texto "Encountered pokémons"', () => {
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });

    expect(heading).toBeInTheDocument();
  });

  it('deve conter um botão com o texto "Próximo pokémon"', () => {
    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(button).toBeInTheDocument();
  });

  it(`deve exibir o próximo Pokémon da lista quando o
    botão "Próximo pokémon" é clicado`, () => {
    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(button).toBeInTheDocument();

    userEvent.click(button);

    const nextPokemon = screen.getByText(/charmander/i);
    expect(nextPokemon).toBeInTheDocument();
  });

  it(`deve existir um botão de filtragem para cada
    tipo de Pokémon, sem repetição`, () => {
    const pokemonTypeList = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    const pokemonTypeBtns = screen.getAllByTestId('pokemon-type-button');
    const typeListing = pokemonTypeBtns.map((type) => type.innerHTML);
    expect(typeListing).toEqual(pokemonTypeList);
  });

  it('deve conter um botão que reseta o filtro quando clicado', () => {
    const fireTypeBtn = screen.getByRole('button', { name: /fire/i });
    expect(fireTypeBtn).toBeInTheDocument();

    userEvent.click(fireTypeBtn);

    const firePokemon = screen.getByText(/charmander/i);
    expect(firePokemon).toBeInTheDocument();

    const allTypesBtn = screen.getByRole('button', { name: /all/i });
    expect(allTypesBtn).toBeInTheDocument();

    userEvent.click(allTypesBtn);

    const initialPokemon = screen.getByText(/pikachu/i);
    expect(initialPokemon).toBeInTheDocument();
  });

  it('ao carregar a página, deve ter filtro All aplicado', () => {
    const fireTypeBtn = screen.getByRole('button', { name: /fire/i });
    expect(fireTypeBtn).toBeInTheDocument();

    userEvent.click(fireTypeBtn);

    const firePokemon = screen.getByText(/charmander/i);
    expect(firePokemon).toBeInTheDocument();

    const linkToFavorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkToFavorites);

    const linkToHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkToHome);

    const initialPokemon = screen.getByText(/pikachu/i);
    expect(initialPokemon).toBeInTheDocument();
  });
});
