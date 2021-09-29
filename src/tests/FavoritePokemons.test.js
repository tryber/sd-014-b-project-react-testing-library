import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('testanto se o FavoritesPokemons esta funcionando corretamente', () => {
  it('Testa se exibe no favorite, caso não tenha pokemon favoritado', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavorit = screen.getByText('No favorite pokemon found');
    expect(noFavorit).toBeInTheDocument();
  });

  it('Testa se exibe todos os pokemons favoritados', () => {
    renderWithRouter(<App />);
    const btnDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(btnDetails);

    const check = screen.getByRole('checkbox');
    userEvent.click(check);

    const link = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(link);

    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toBeInTheDocument();
  });
});
