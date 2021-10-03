import React from 'react';
import { screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const titleH2 = screen
      .getByRole('heading', { level: 2, name: /Encountered pokémons/ });
    expect(titleH2).toBeDefined();
  });
  it(
    'Teste se é exibido o próximo Pokémon quando o botão Próximo pokémon é clicado.',
    () => {
      renderWithRouter(<App />);
      const nextPokemonButton = screen.getByRole('button', { name: /Próximo pokémon/ });

      fireEvent.click(nextPokemonButton);
      const pokemom = screen.getByText(/charmander/i);
      expect(pokemom).toBeDefined();
    },
  );
  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const amountOfPokemon = screen.getAllByTestId('pokemon-name');
    expect(amountOfPokemon.length).toStrictEqual(1);
  });
  it('Teste se a Pokédex tem os botões de filtro', () => {
    const pokemonTypesButtons = 7;
    renderWithRouter(<App />);
    const typesOfpokemon = screen.getAllByTestId('pokemon-type-button');
    expect(typesOfpokemon.length).toStrictEqual(pokemonTypesButtons);
    pokemons.forEach(({ type }) => {
      const typeOfButton = screen.getByRole('button', { name: `${type}` });
      expect(typeOfButton).toBeDefined();
    });
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const AllButton = screen.getByRole('button', { name: 'All' });
    fireEvent.click(AllButton);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeDefined();
  });
});
