import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Requisito 3 - Testa o componente <FavoritePokemons.js />', () => {
  renderWithRouter(<FavoritePokemons />);

  test('Verifica se é exibido uma mensagem'
        + 'caso a pessoa não tiver pokémons favoritos.', () => {
    const message = screen.getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();
  });

  test('Verifica se todos os cards de pokémons favoritados são exibidos', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: 'More details' });
    userEvent.click(details);

    const favorite = screen.getByRole('checkbox');
    userEvent.click(favorite);

    const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavorite);

    const pokemons = screen.getByText('Pikachu');
    expect(pokemons).toBeInTheDocument();
  });
});
