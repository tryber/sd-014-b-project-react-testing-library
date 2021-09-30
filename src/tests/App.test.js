import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import { screen, fireEvent } from '@testing-library/react';
/* import { userEvent } from '@testing-library/user-event'; */

describe('Requisito 1: Teste o componente <App.js />', () => {
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
    const { history } = renderWithRouter(<App />);

    fireEvent.click(screen.getByText(/Home/));

    const pathname = history.location.pathname;
    expect(pathname).toBe('/');

    const subheading = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(subheading).toBeInTheDocument();
  });

  test('if link "About" redirects to home page', () => {
    const { history } = renderWithRouter(<App />);

    fireEvent.click(screen.getByText(/About/));

    const pathname = history.location.pathname;
    expect(pathname).toBe('/about');
  });

  test('if link "favorites" redirects to home page', () => {
    const { history } = renderWithRouter(<App />);

    fireEvent.click(screen.getByText(/Favorite Pokémons/));

    const pathname = history.location.pathname;
    expect(pathname).toBe('/favorites');
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
