import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente <FavoritePokemons.js />', () => {
  it('Testa se é exibido na tela a mensagem No favorite pokemon found.', () => {
    renderWithRouter(<FavoritePokemons />);

    const notFoundPokemon = screen.getByText('No favorite pokemon found');
    expect(notFoundPokemon).toBeInTheDocument();
  });

  it('Testa se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: 'More details' });
    userEvent.click(link);

    const checkboxFavorite = screen.getByRole('checkbox');
    userEvent.click(checkboxFavorite);

    const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavorite);

    const pokemon = screen.getByText(/Pikachu/i);
    expect(pokemon).toBeInTheDocument();
  });
});
