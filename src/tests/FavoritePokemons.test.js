import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

describe('Testa se a funcionalidade de favoritar Pokémons funciona', () => {
  test('se quando não há pokemon favorito, exibe a mensagem de not found', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFound = screen.getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });

  test('se o card do pokémon favoritado é exibido', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(detailsLink);

    const favCheckbox = screen.getByRole('checkbox');
    userEvent.click(favCheckbox);

    const favoritesLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoritesLink);

    const card = screen.getByTestId('pokemon-name');
    expect(card).toBeInTheDocument();
  });
});
