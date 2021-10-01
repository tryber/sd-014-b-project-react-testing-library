import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente About', () => {
  it('deveria apresentar o texto `No favorite pokemon found` no quando'
    + ' não houver pokemon favoritado',
  () => {
    renderWithRouter(<FavoritePokemons />);
    const pokemonsNotFound = screen.getByText('No favorite pokemon found');
    expect(pokemonsNotFound).toBeInTheDocument();
  });

  it('deveria renderizar cards de pokemons favoritados quando houver', () => {
    renderWithRouter(<App />);
    const moreDetais = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetais);
    const checkbox = screen.getByRole('checkbox', { checked: false });
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    const favoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoritePokemons);
    const averageWeight = screen.queryAllByText(/Average weight/);
    expect(averageWeight.length).toBeGreaterThan(0);
  });
});
