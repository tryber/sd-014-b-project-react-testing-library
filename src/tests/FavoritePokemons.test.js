import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import App from '../App';

describe('Testa a funcionalidade do componente Favorite Pokémons', () => {
  it('"No favorite pokemon found" é mostrado caso não haja pokémons favoritos', () => {
    const { history } = renderWithRouter(<App />);

    const favorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favorite).toBeInTheDocument();

    userEvent.click(favorite);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const textNotFound = screen.getByText('No favorite pokemon found');
    expect(textNotFound).toBeInTheDocument();
  });

  it('verifica se é exibido todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const details = screen.getByText('More details');
    userEvent.click(details);

    const favoriteCheck = screen.getByRole('checkbox');
    userEvent.click(favoriteCheck);

    const favorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favorite).toBeInTheDocument();

    userEvent.click(favorite);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const favoritesLength = screen.getAllByTestId('pokemon-name');
    expect(favoritesLength).toHaveLength(1);
  });
});
