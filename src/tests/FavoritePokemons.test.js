import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js', () => {
  it('Teste o componente <FavoritePokemons.js', () => {
    render(<FavoritePokemons />);

    const favoriteTitle = screen.getByText('Favorite pokémons');
    const notFoundMessage = screen.getByText('No favorite pokemon found');

    expect(favoriteTitle).toBeInTheDocument();
    expect(notFoundMessage).toBeInTheDocument();
  });
  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const moreDetailsButton = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetailsButton);

    const favoriteButton = screen.getByRole('checkbox');
    userEvent.click(favoriteButton);

    const favoritePage = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoritePage);

    const pokemon = screen.getByText('Pikachu');
    expect(pokemon).toBeInTheDocument();
  });
});
