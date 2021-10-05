import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import { PokemonDetails } from '../components';

describe('Testando o componente PokemonDetails.js', () => {
  it('', () => {
    renderWithRouter(<PokemonDetails />);
    expect(screen.getByText('Summary')).toBeInTheDocument();
  });
});
