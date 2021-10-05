import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testa o componente FavoritePokemons', () => {
  test('se é exibido a mensagem No favorite pokemon found', () => {
    render(<FavoritePokemons />);
    const noFavotirePokemon = screen.getByText('No favorite pokemon found');
    expect(noFavotirePokemon).toBeInTheDocument();
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
