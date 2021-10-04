import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente Pokedex', () => {
  test('se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const headerEncontered = screen.getByRole('heading',
      { name: 'Encountered pokémons',
        level: 2,
      });
    expect(headerEncontered).toBeInTheDocument();
  });

  test('se é exibido o próximo Pokémon da lista quando o botão Próximo é clicado', () => {
    renderWithRouter(<App />);
    const btnNext = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(btnNext).toBeInTheDocument();
    userEvent.click(btnNext);
    const namePokemon = screen.getByTestId('pokemon-name');
    const typePokemon = screen.getByTestId('pokemon-type');
    expect(namePokemon).toBeInTheDocument();
    expect(namePokemon).toHaveTextContent('Charmander');
    expect(typePokemon).toBeInTheDocument();
    expect(typePokemon).toHaveTextContent('Fire');
    userEvent.click(btnNext);
    expect(namePokemon).toHaveTextContent('Caterpie');
    userEvent.click(btnNext);
    expect(namePokemon).toHaveTextContent('Ekans');
    userEvent.click(btnNext);
    expect(namePokemon).toHaveTextContent('Alakazam');
    userEvent.click(btnNext);
    expect(namePokemon).toHaveTextContent('Mew');
    userEvent.click(btnNext);
    expect(namePokemon).toHaveTextContent('Rapidash');
    userEvent.click(btnNext);
    expect(namePokemon).toHaveTextContent('Snorlax');
    userEvent.click(btnNext);
    expect(namePokemon).toHaveTextContent('Dragonair');
    userEvent.click(btnNext);
    expect(namePokemon).toHaveTextContent('Pikachu');
  });

  test('se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const namePokemon = screen.getAllByTestId('pokemon-name');
    expect(namePokemon.length).toBe(1);
    const btnNext = screen.getByTestId('next-pokemon');
    userEvent.click(btnNext);
    expect(namePokemon.length).toBe(1);
  });

  test('se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const buttons = ['All', 'Electric', 'Fire', 'Bug', 'Poison',
      'Psychic', 'Normal', 'Dragon', 'Próximo pokémon'];
    buttons.forEach((type) => {
      const btn = screen.getByRole('button', { name: `${type}` });
      expect(btn).toBeInTheDocument();
    });
    const btnFilters = screen.getAllByTestId('pokemon-type-button');
    const numberFilters = 7;
    expect(btnFilters.length).toBe(numberFilters);
  });

  test(
    'se a partir da seleção de um botão de tipo, é exibido somente pokémons daquele tipo',
    () => {
      renderWithRouter(<App />);
      const btnFire = screen.getByRole('button', { name: 'Fire' });
      const btnNext = screen.getByTestId('next-pokemon');
      const btnAll = screen.getByRole('button', { name: 'All' });
      expect(btnFire).toBeInTheDocument();
      expect(btnAll).toBeVisible();
      userEvent.click(btnFire);
      const typePokemon = screen.getByTestId('pokemon-type');
      expect(typePokemon).toHaveTextContent('Fire');
      expect(btnFire).toHaveTextContent(typePokemon.textContent);
      expect(btnAll).toBeVisible();
      userEvent.click(btnNext);
      expect(typePokemon).toHaveTextContent('Fire');
      expect(btnFire).toHaveTextContent(typePokemon.textContent);
      expect(btnAll).toBeVisible();
      userEvent.click(btnNext);
      expect(typePokemon).toHaveTextContent('Fire');
      expect(btnFire).toHaveTextContent(typePokemon.textContent);
      expect(btnAll).toBeVisible();
    },
  );

  test('se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: 'All' });
    expect(btnAll).toBeInTheDocument();
    expect(btnAll).toHaveTextContent('All');
    const btnFire = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(btnFire);
    userEvent.click(btnAll);
    const pokemoName = screen.getByText(/Pikachu/i);
    const pokemonAverage = screen.getByText(/Average weight: 6.0 kg/i);
    expect(pokemoName).toBeInTheDocument();
    expect(pokemonAverage).toBeInTheDocument();
  });
});
