import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { Pokedex } from '../components';
import pokemons from '../data';

const setup = () => {
  const isPokemonFavoriteById = {};
  return renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />);
};

describe('Testa o componente Pokedex', () => {
  test('se página contém um heading h2 com o texto Encountered pokémons', () => {
    setup();
    const titlePokedex = screen.getByRole('heading',
      { name: 'Encountered pokémons' });
    expect(titlePokedex).toBeInTheDocument();
  });
  test('se botão contem o texto Próximo pokémon', () => {
    setup();
    const textButton = screen.getByTestId('next-pokemon');
    expect(textButton.innerHTML).toBe('Próximo pokémon');
  });
  test('se os próximos Pokémons são mostrados ao clicar no botão', () => {
    setup();
    const pokemonDetail = screen.getByRole('link');
    expect(pokemonDetail.href).toContain('/pokemons/25');

    const nextButton = screen.getByTestId('next-pokemon');
    userEvent.click(nextButton);

    const pokemonDetailNext = screen.getByRole('link');
    expect(pokemonDetailNext.href).toContain('/pokemons/4');
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    setup();
    const pokemonLinks = screen.getAllByRole('link');
    const pokemonLinksExpected = 1;
    expect(pokemonLinks.length).toBe(pokemonLinksExpected);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    setup();
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const filterLengthExpected = 7;
    expect(filterButtons.length).toBe(filterLengthExpected);
    expect(filterButtons[0].innerHTML).toBe('Electric');
    expect(filterButtons[1].innerHTML).toBe('Fire');
    expect(filterButtons[2].innerHTML).toBe('Bug');
    expect(filterButtons[3].innerHTML).toBe('Poison');
    expect(filterButtons[4].innerHTML).toBe('Psychic');
    expect(filterButtons[5].innerHTML).toBe('Normal');
    expect(filterButtons[6].innerHTML).toBe('Dragon');
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    setup();
    const allButton = screen.getByRole('button',
      { name: 'All' });
    expect(allButton).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    setup();
    const linkPokemon = screen.getByRole('link');
    const allButton = screen.getByRole('button', { name: 'All' });
    userEvent.click(allButton);
    const actualLinkPokemon = screen.getByRole('link');
    expect(linkPokemon).toBe(actualLinkPokemon);
  });
});
