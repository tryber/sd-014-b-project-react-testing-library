import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste do componente Pokedex', () => {
  it('deveria conter um <h2> com o texto `Encountered pokémons`', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });
    expect(title).toBeInTheDocument();
  });
});
