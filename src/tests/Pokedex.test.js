import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);
    const h2Text = screen
      .getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(h2Text).toBeInTheDocument();
  });
  test('Teste se é exibido o próximo Pokémon da lista', () => {
    renderWithRouter(<App />);
    const btn = screen.getByTestId('next-pokemon');
    userEvent.click(btn);
    expect(btn).toBeInTheDocument();
    expect(btn.innerHTML).toEqual('Próximo pokémon');
    const pokemon = screen.getByText('Charmander');
    expect(pokemon).toBeInTheDocument();
  });
  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const POKE_BTN_TYPE_LENGTH = 7;
    const filterBtn = screen.getByText('All');
    expect(filterBtn).toBeInTheDocument();
    const pokeTypeBtn = screen.getAllByTestId('pokemon-type-button');
    expect(pokeTypeBtn.length).toBe(POKE_BTN_TYPE_LENGTH);
    pokemons.forEach(({ type }) => {
      const typeButton = screen.getByRole('button', { name: type });
      expect(typeButton).toBeInTheDocument();
    });
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const filterBtn = screen.getByRole('button', { name: 'All' });
    expect(filterBtn).toBeInTheDocument();
    userEvent.click(filterBtn);
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const POKE_LENGTH = 1;
    const pokemonRender = screen.getAllByTestId('pokemon-name');
    expect(pokemonRender.length).toBe(POKE_LENGTH);
  });
});
