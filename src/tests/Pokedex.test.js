import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import { Pokedex } from '../components';

describe('Testando o componente Pokedex.js', () => {
  it('Verifica se contém um h2 com "Encountered pokémons"', () => {
    renderWithRouter(<Pokedex />);
    const encounteredText = screen.getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });
    expect(encounteredText).toBeInTheDocument();
  });
});
