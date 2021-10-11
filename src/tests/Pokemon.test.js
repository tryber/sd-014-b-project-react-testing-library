import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
// import pokemons from '../data';

describe('Teste o componente <Pokemon.js />', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe('Pikachu');
  });
  it('O tipo correto do pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.innerHTML).toBe('Electric');
  });

  it(`O peso médio do pokémon deve ser exibido com um texto
   no formato Average weight: <value> <measurementUnit>;
   onde <value> e <measurementUnit> são, respectivamente,
   o peso médio do pokémon e sua unidade de medida`,
  () => {
    renderWithRouter(<App />);
    const pokemonType = screen.getByTestId('pokemon-weight');
    expect(pokemonType.innerHTML).toBe('Average weight: 6.0 kg');
  });

});
