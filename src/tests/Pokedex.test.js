import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste Pokedex', () => {
  it('verifica h2', () => {
    renderWithRouter(<App />);

    const h2pokemons = screen.getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });
    expect(h2pokemons).toBeInTheDocument();
  });
});