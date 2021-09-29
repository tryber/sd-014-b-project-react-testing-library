import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter ';

describe('Testando o componente "FavoritePokemons.js"', () => {
  test('Verificar se o componente "FavoritePokemons.js" renderiza.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');

    const noFavoritePokemonText = screen.getByText(/No favorite/);
    expect(noFavoritePokemonText).toBeInTheDocument();
    expect(noFavoritePokemonText).toHaveTextContent('No favorite pokemon found');
  });
});
