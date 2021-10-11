import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste do Componente FavoritePokemons', () => {
  test('Componente FavoritePokemons', () => {
    render(<FavoritePokemons />);
    const noFavorites = screen.getByText('No favorite pokemon found');
    expect(noFavorites).toBeInTheDocument();
  });

  test('se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);
    const buttonMoreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(buttonMoreDetails);

    const favoritePokemon = screen.getByRole('checkbox');
    userEvent.click(favoritePokemon);

    const linkFavoritePokemon = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavoritePokemon);

    const pokemons = screen.getByText('Pikachu');
    expect(pokemons).toBeInTheDocument();
  });
});
