import React from 'react';
import { cleanup, screen, render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

afterEach(cleanup);

describe('applies tests for favorite pokémons page', () => {
  it('should display a not found text if none are marked', () => {
    render(<FavoritePokemons />);
    const notFound = screen.getByText(/No favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });
});
