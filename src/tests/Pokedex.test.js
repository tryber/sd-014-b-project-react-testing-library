import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../uteis/renderWithRouter';
import App from '../App';

describe('Testa o component Pokedex', () => {
  test('se página contém um heading h2 com o texto "Encountered pokémons".', () => {
    renderWithRouter(<App />);
    const titlePokedex = screen.getByRole('heading',
      { level: 2, name: 'Encountered pokémons' });
    expect(titlePokedex).toBeInTheDocument();
  });
});
