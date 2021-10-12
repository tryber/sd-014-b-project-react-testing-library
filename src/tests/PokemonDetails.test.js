import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../uteis/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente "PokemonDetails".', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('se o título de detalhes do pokemon está na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const h2PokemonDetails = screen
      .getByRole('heading', { name: `${pokemons[0].name} Details` });
    expect(h2PokemonDetails).toBeInTheDocument();
  });
});
