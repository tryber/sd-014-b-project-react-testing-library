import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../uteis/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente "Pokemon".', () => {
  test('se o nome do pokemon correto aparece na tela', () => {
    // renderizar o app
    renderWithRouter(<App />);
    // capturar a lista de tipos
    pokemons.forEach((pokemon) => {
      // verificar se o nome do pokemon na tela é igual ao nome do 1 pokemon na lista
      const pokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonName.innerHTML).toBe(pokemon.name);

      console.log(`pokemon na tela ${pokemonName.innerHTML}`);

      console.log(`pokemon na lista ${pokemon.name}`);

      console.log(`Data pokemon ${pokemon.type}`);

      // // para cada tipo clicar no botão proximo
      const buttonNextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
      userEvent.click(buttonNextPokemon);
    });
    // após o click verificar se o nome correto estã la tela
  });
});
