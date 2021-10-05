import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa a Pokedex', () => {
  test('Testa se o h2 com Encountered pokémons', () => {
    renderWithRouter(<App />);
    const pokedexHeader = screen.getByRole('heading',
      { name: 'Encountered pokémons' });
    expect(pokedexHeader).toBeInTheDocument();
  });

  describe('Testa o botão Próximo Pokemon', () => {
    test(`Testa se o botão possui o texto Próximo Pokemon e se o primeiro é exibido após
    o último`, () => {
      renderWithRouter(<App />);
      const nextPokemonBtn = screen.getByTestId('next-pokemon',
        { name: 'Próximo pokémon' });
      expect(nextPokemonBtn).toBeInTheDocument();
      const pokemonName = screen.getByTestId('pokemon-name');
      pokemons.forEach((pokemon, index) => {
        const lastPosition = pokemons.length - 1;
        if (index === lastPosition) {
          userEvent.click(nextPokemonBtn);
          expect(pokemonName).toHaveTextContent('Pikachu');
        } else {
          userEvent.click(nextPokemonBtn);
        }
      });
    });

    test('Testa se os pokemons são apresentados um por um', () => {
      renderWithRouter(<App />);
      const numberOfImgs = screen.getAllByRole('img');
      expect(numberOfImgs.length).toBe(1);
    });
  });

  describe('Testa os botões de filtro', () => {
    test('Testa se existem botões de filtragem', () => {
      renderWithRouter(<App />);
      const filterBtn = screen.getAllByTestId('pokemon-type-button');
      filterBtn.forEach((button) => {
        expect(button).toBeInTheDocument();
      });
    });
    test(`Testa se cada tipo pokemon possui um botão de filtragem e se, a partir da
    seleção de um deles, a Pokedéx circula somente naquele tipo`, () => {
      renderWithRouter(<App />);
      const arrayOfTypes = pokemons.map((pokemon) => pokemon.type);
      const nextPokemonBtn = screen.getByTestId('next-pokemon',
        { name: 'Próximo pokémon' });
      arrayOfTypes.forEach((type) => {
        const filterByTypeBtn = screen.getByRole('button', {
          name: type,
        });
        expect(filterByTypeBtn).toBeInTheDocument();
        userEvent.click(filterByTypeBtn);
        const pokemonsByType = pokemons.filter((pokemon) => pokemon.type === type);
        pokemonsByType.forEach((pokemon) => {
          expect(pokemon.type).toBe(type);
          userEvent.click(nextPokemonBtn);
        });
      });
    });

    test(`Testa se existe o botão All, se a Pokedex mostra todos os pokemons
      com o botão selecionado e se página carrega com ele selecionado`, () => {
      renderWithRouter(<App />);
      const allBtn = screen.getByRole('button', {
        name: 'All',
      });
      expect(allBtn).toBeInTheDocument();
      userEvent.click(allBtn);
      const pokemon = screen.getByText('Pikachu');
      expect(pokemon).toBeInTheDocument();
    });
  });
});
