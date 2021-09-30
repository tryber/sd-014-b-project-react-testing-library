import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import data from '../data';
import renderWithRouter from './renderWithRouter ';

describe('Testando o componente "Pokedex.js"', () => {
  const ButtonText = 'Próximo pokémon';
  test('Verificar se o texto "Encountered pokémons" renderiza.', () => {
    renderWithRouter(<App />);
    const pokedexTitle = screen.getByRole('heading', { level: 2 });
    expect(pokedexTitle).toHaveTextContent('Encountered pokémons');
  });

  test('Verificar se o botão "Próximo pokémon" renderiza.', () => {
    renderWithRouter(<App />);
    const nextPokemonBtn = screen.getByRole('button', { name: ButtonText });
    expect(nextPokemonBtn).toHaveTextContent('Próximo pokémon');
  });

  test('Verificar se, ao clicar no botão, o próximo pokémon é renderiza.', () => {
    renderWithRouter(<App />);
    const nextPokemonBtn = screen.getByRole('button', { name: ButtonText });
    userEvent.click(nextPokemonBtn);
    const nextPokemon = screen.getByText(/Charmander/);
    expect(nextPokemon).toBeInTheDocument();
  });

  test('Verificar se, após o último pokémon, o primeiro pokémon é renderizado.', () => {
    renderWithRouter(<App />);
    const nextPokemon = screen.getByTestId('pokemon-name');
    const nextPokemonBtn = screen.getByRole('button', { name: ButtonText });

    data.forEach((pokemon, index) => {
      expect(nextPokemon).toHaveTextContent(pokemon.name);
      userEvent.click(nextPokemonBtn);
      if (index === data.length - 1) {
        expect(nextPokemon).toHaveTextContent('Pikachu');
      }
    });
  });

  test('Verificar se os botões de filtragem são renderizados.', () => {
    renderWithRouter(<App />);
    const typeButtonTestId = 'pokemon-type-button';
    const typeButtons = ['All', 'Electric', 'Fire', 'Bug',
      'Poison', 'Psychic', 'Normal', 'Dragon'];
    const btnAll = screen.getByRole('button', { name: 'All' });
    expect(btnAll).toBeInTheDocument();
    typeButtons.forEach(() => {
      const btnType = screen.getAllByTestId(typeButtonTestId);
      btnType.forEach((eachBtn) => {
        expect(btnAll).toBeInTheDocument();
        expect(eachBtn).toBeInTheDocument();
        userEvent.click(eachBtn);
        const pokemonType = screen.getByTestId('pokemon-type');
        expect(pokemonType).toBeInTheDocument();
        expect(pokemonType).toHaveTextContent(eachBtn.textContent);
      });
    });

    userEvent.click(btnAll);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toBeInTheDocument();
  });
});
