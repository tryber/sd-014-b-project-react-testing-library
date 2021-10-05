import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Testando o componente Pokedex.js', () => {
  const POKE_NAME_TESTID = 'pokemon-name';
  const NEXT_POKE_TESTID = 'next-pokemon';

  it('Verifica se contém um h2 com "Encountered pokémons"', () => {
    renderWithRouter(<App />); // render do Pokedex dá erro na função filterPokemon.
    const encounteredText = screen.getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });
    expect(encounteredText).toBeInTheDocument();
  });

  it('Verifica se é exibido o pŕoximo Pokemon da lista ao clicar em Próximo', () => {
    renderWithRouter(<App />);
    const firstPokemon = screen.getByTestId(POKE_NAME_TESTID);
    const nextPokeBtn = screen.getByTestId(NEXT_POKE_TESTID);

    expect(nextPokeBtn.textContent).toBe('Próximo pokémon');
    expect(firstPokemon.textContent).toBe('Pikachu');
    userEvent.click(nextPokeBtn);
    const secondPokemon = screen.getByTestId(POKE_NAME_TESTID);
    expect(secondPokemon.textContent).toBe('Charmander');
  });

  it('Verifica se é mostrado um Pokemon por vez', () => {
    renderWithRouter(<App />);
    const pokeNames = screen.getAllByTestId(POKE_NAME_TESTID);
    expect(pokeNames).toHaveLength(1);
  });

  it('Verifique se a Pokedex possui botões de filtro', () => {
    const pokeType = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    renderWithRouter(<App />);

    // Identificação dos botões

    const typeFilterBtns = screen.getAllByTestId('pokemon-type-button');
    const allTypesBtn = screen.getByRole('button', { name: 'All' });
    const fireTypeBtn = screen.getByRole('button', { name: 'Fire' });
    const nextPokeBtn = screen.getByTestId(NEXT_POKE_TESTID);

    // Ciclagem de pokemons do mesmo tipo

    userEvent.click(fireTypeBtn);
    expect(screen.getByTestId(POKE_NAME_TESTID).textContent).toBe('Charmander');
    userEvent.click(nextPokeBtn);
    expect(screen.getByTestId(POKE_NAME_TESTID).textContent).toBe('Rapidash');

    // Botões de filtro de tipos, quantidade e se são covalentes

    pokeType.forEach((type) => {
      const typeBtn = screen.getByRole('button', { name: type });
      expect(type).toMatch(typeBtn.textContent);
    });
    expect(typeFilterBtns).toHaveLength(pokeType.length);

    // Visibilidade do botão de todos os tipos

    expect(allTypesBtn).toBeVisible();
  });

  it('Verifique se existe um botão para resetar o filtro', () => {
    const pokes = pokemons.reduce((names, { name }) => [...names, name], []);

    renderWithRouter(<App />);
    const allTypesBtn = screen.getByRole('button', { name: 'All' });
    const nextPokeBtn = screen.getByTestId(NEXT_POKE_TESTID);

    expect(allTypesBtn).toBeEnabled();

    expect(screen.getByTestId(POKE_NAME_TESTID).textContent).toBe('Pikachu');
    userEvent.click(screen.getByRole('button', { name: 'Poison' }));
    expect(screen.getByTestId(POKE_NAME_TESTID).textContent).toBe('Ekans');
    userEvent.click(allTypesBtn);

    pokes.forEach((pokemon) => {
      expect(screen.getByTestId(POKE_NAME_TESTID).textContent).toBe(pokemon);
      userEvent.click(nextPokeBtn);
    });
    expect(allTypesBtn.textContent).toBe('All');
  });
});
