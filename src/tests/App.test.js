import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Helpers/RenderRouter';
import App from '../App';

describe('o componente app', () => {
  it('deve possuir um cabeçalho fixo de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoriteLink).toBeInTheDocument();

    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');

    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });
});
