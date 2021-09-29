import React from 'react';
import { screen, render } from '@testing-library/react';
import { Pokedex } from '../components';
import pokemons from '../data';

describe('5 - Testa o arquivo Pokedex.js', () => {
  it('Verifica se outro pokémon é exibido quando `Proximo Pokemon` é clicado', () => {
    render(<Pokedex pokemon={ pokemons } />);
    const nextPokemon = screen.getByTestId('pokemon-type-button');
    expect(nextPokemon).toBeInTheDocument();
  });
});
