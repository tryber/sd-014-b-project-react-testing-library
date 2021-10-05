import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Testa o componente Pokedex', () => {
  test('se a página contém um h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(h2).toBeInTheDocument();
  });

  test('se é exibido o próximo Pokémon, quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);

    const buttonNextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(buttonNextPokemon).toBeInTheDocument();

    for (let index = 1; index < pokemons.length; index += 1) {
      userEvent.click(buttonNextPokemon);
      expect(screen.getByText(pokemons[index].name)).toBeInTheDocument();
    }
  });

  test('se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonResetAll = screen.getByRole('button', { name: 'All' });
    userEvent.click(buttonResetAll);
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });

  test('se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const type = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    type.forEach((typePokemon) => {
      const button = screen.getByRole('button', { name: typePokemon });
      expect(button).toBeInTheDocument();
    });

    const buttonFilterPokemons = screen.getAllByTestId('pokemon-type-button');
    expect(buttonFilterPokemons.length).toEqual(type.length);

    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
  });

  test('se é mostrado apenas um pokemon por vez', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon.length).toEqual(1);
  });
});
