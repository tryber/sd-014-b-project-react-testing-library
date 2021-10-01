import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Req1: Testing Component <App.js />', () => {
  test('if navigation links are "Home", "About" and "Favorite Pokémons"', () => {
    renderWithRouter(<App />);

    const firstLink = screen.getByRole('link', {
      name: 'Home',
    });

    expect(firstLink).toBeInTheDocument();

    const secondLink = screen.getByRole('link', {
      name: 'About',
    });

    expect(secondLink).toBeInTheDocument();

    const thirdLink = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });

    expect(thirdLink).toBeInTheDocument();
  });

  test('if link "Home" redirects to home page', () => {
    const { history: { location: { pathname } } } = renderWithRouter(<App />);

    fireEvent.click(screen.getByText(/Home/));

    const pathName = pathname;
    expect(pathName).toBe('/');

    const subheading = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(subheading).toBeInTheDocument();
  });

  test('if link "About" redirects to home page', () => {
    const { history } = renderWithRouter(<App />);

    fireEvent.click(screen.getByText(/About/));

    expect(history.location.pathname).toBe('/about');
  });

  test('if link "favorites" redirects to home page', () => {
    const { history } = renderWithRouter(<App />);

    fireEvent.click(screen.getByText(/Favorite Pokémons/));

    expect(history.location.pathname).toBe('/favorites');
  });

  test('if "not-found" page works properly', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/digimon');

    const textNotFound = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/,
    });

    expect(textNotFound).toBeInTheDocument();
  });
});
