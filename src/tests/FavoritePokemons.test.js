import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Testa se é exibido uma mensagem se a pessoa não tiver pokémons favoritos.', () => {
  render(<FavoritePokemons />);
  const pokemon = screen.getByRole('heading', { level: 2, name: 'Favorite pokémons' });
  expect(pokemon).toBeInTheDocument();

  const notFound = screen.getByText('No favorite pokemon found');
  expect(notFound).toBeInTheDocument();
});

test('Testa se são exibidos os cards dos pokémons favoritados', () => {
  renderWithRouter(<App />);
  const link = screen.getByRole('link', { name: 'More details' });
  userEvent.click(link);

  const favorite = screen.getByRole('checkbox');
  userEvent.click(favorite);

  const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
  userEvent.click(linkFavorite);

  const pokemon = screen.getByText(/Pikachu/i);
  expect(pokemon).toBeInTheDocument();
});
