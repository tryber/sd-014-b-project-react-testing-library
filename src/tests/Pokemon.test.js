import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../uteis/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente "Pokemon".', () => {
  const NEXT_POKEMON = 'Próximo pokémon';
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('se o nome correto do pokemon aparece na tela', () => {
    pokemons.forEach((pokemon) => {
      const pokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonName.innerHTML).toBe(pokemon.name);
      const buttonNextPokemon = screen.getByRole('button', { name: NEXT_POKEMON });
      userEvent.click(buttonNextPokemon);
    });
  });

  test('se o tipo correto do pokemon aparece na tela', () => {
    pokemons.forEach((pokemon) => {
      const pokemonName = screen.getByTestId('pokemon-type');
      expect(pokemonName.innerHTML).toBe(pokemon.type);
      const buttonNextPokemon = screen.getByRole('button', { name: NEXT_POKEMON });
      userEvent.click(buttonNextPokemon);
    });
  });

  test('se o peso médio correto do pokemon aparece na tela', () => {
    pokemons.forEach((pokemon) => {
      const pokemonName = screen.getByTestId('pokemon-weight');
      expect(pokemonName.innerHTML).toBe(`Average weight: ${
        pokemon.averageWeight.value} ${pokemon.averageWeight.measurementUnit}`);
      const buttonNextPokemon = screen.getByRole('button', { name: NEXT_POKEMON });
      userEvent.click(buttonNextPokemon);
    });
  });

  test('se a imagem do pokemon é exibida corretamente', () => {
    pokemons.forEach((pokemon) => {
      const imgPokemon = screen.getByRole('img', { name: `${pokemon.name} sprite` });
      expect(imgPokemon).toBeInTheDocument();
      expect(imgPokemon.src).toStrictEqual(pokemon.image);
      const buttonNextPokemon = screen.getByRole('button', { name: NEXT_POKEMON });
      userEvent.click(buttonNextPokemon);
    });
  });

  test('se o link para mais detalhes do pokemon é exibido corretamente', () => {
    pokemons.forEach((pokemon) => {
      const linkMoreDetails = screen.getByRole('link', { name: 'More details' });
      expect(linkMoreDetails).toBeInTheDocument();
      expect(linkMoreDetails).toHaveAttribute('href', `/pokemons/${pokemon.id}`);
      const buttonNextPokemon = screen.getByRole('button', { name: NEXT_POKEMON });
      userEvent.click(buttonNextPokemon);
    });
  });

  test('se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const checkboxFavorite = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(checkboxFavorite);

    const igmStar = screen.getByRole('img', { name: /Pikachu is marked as favorite/i });
    expect(igmStar).toHaveAttribute('src', '/star-icon.svg');
  });
});
