import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('test component App', () => {
  test('if the top of the application contains a fixed set of navigation links.', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', {
      name: 'Home',
    });
    const aboutLink = screen.getByRole('link', {
      name: 'About',
    });
    const favoritesLink = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritesLink).toBeInTheDocument();
  });
  test('if the application is redirected to the home page', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', {
      name: 'Home',
    });
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });
  test('if the application is redirected to the About page', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', {
      name: 'About',
    });
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });
  test('if the application is redirected to the Favorite Pokemons page', () => {
    const { history } = renderWithRouter(<App />);
    const favoritesLink = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    userEvent.click(favoritesLink);
    expect(history.location.pathname).toBe('/favorites');
  });
  test('if the application is redirected to the Not Found page', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rotainxistente');
    /* const emoji = screen.getByRole('img', {
      name: 'Crying emoji',
    }); */
    const title = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(title).toBeInTheDocument();
  });
});
