import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
// import { Pokedex } from '../components';
import App from '../App';

describe('Testando o componente Pokedex.js', () => {
  it('Verifica se contém um h2 com "Encountered pokémons"', () => {
    renderWithRouter(<App />); // render do Pokedex dá erro na função filterPokemon.
    const encounteredText = screen.getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });
    expect(encounteredText).toBeInTheDocument();
  });
});
