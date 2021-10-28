import React from 'react';
import { screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

// Documentação consultada para este requisito https://testing-library.com/docs/dom-testing-library/api-events/
describe('Testa o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const heading = screen
      .getByRole('heading', { level: 2, name: /Encountered pokémons/ });
    expect(heading).toBeDefined();
  });
  test(
    'Teste se é exibido o próximo Pokémon quando o botão Próximo pokémon é clicado.',
    () => {
      renderWithRouter(<App />);
      const nextPokemonButton = screen.getByRole('button', { name: /Próximo pokémon/ });

      fireEvent.click(nextPokemonButton);
      const pokemom = screen.getByText(/charmander/i);
      expect(pokemom).toBeDefined();
    },
  );
  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const quantityOfPokemon = screen.getAllByTestId('pokemon-name');
    expect(quantityOfPokemon.length).toStrictEqual(1);
  });
  test('Teste se a Pokédex tem os botões de filtro', () => {
    const pokemonTypesButtons = 7;
    renderWithRouter(<App />);
    const typesOfPokemon = screen.getAllByTestId('pokemon-type-button');
    expect(typesOfPokemon.length).toStrictEqual(pokemonTypesButtons);
    pokemons.forEach(({ type }) => {
      const typeOfButton = screen.getByRole('button', { name: `${type}` });
      expect(typeOfButton).toBeDefined();
    });
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: 'All' });
    fireEvent.click(buttonAll);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeDefined();
  });
});
