import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import RouterRender from '../components/RouterRender';
import App from '../App';

describe('Testing App.js', () => {
  it('should contain a fixed set of navigation links at the top of the page', () => {
    RouterRender(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  it('should be redirected to the home page when clicked on Home on the navbar', () => {
    const { history } = RouterRender(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });

    fireEvent.click(homeLink);

    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  test('should be redirected to the about page when clicked on About on the navbar', () => {
    const { history } = RouterRender(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });

    fireEvent.click(aboutLink);

    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  it('should be redirected to the Favorite Pokemonm page when clicked on Favorite on the navbar', () => {
    const { history } = RouterRender(<App />);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

    fireEvent.click(favoriteLink);

    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  test('should be redirected to Not Found page when entering in an unknown URL', () => {
    const { history } = RouterRender(<App />);

    history.push('/trybe');

    const notFound = screen.getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
