import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Requisito 3', () => {
  it(`Na tela mostra a mensagem "No favorite pokemon found" 
  se não tiver pokemons favoritos?`, () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavorite = screen.getByText('No favorite pokemon found');
    expect(noFavorite).toBeInTheDocument();
  });
  it('Exibe os pokémons favoritados?', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', {
      name: 'More details',
    });
    userEvent.click(moreDetails);
    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);
    const favoritePoke = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    userEvent.click(favoritePoke);
    const pokemon = screen.getByText(/Pikachu/);
    expect(pokemon).toBeInTheDocument();
  });
});
