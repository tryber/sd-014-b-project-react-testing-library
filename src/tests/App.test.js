import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import App from '../App';

describe('App.js tests - RQ-01', () => {
  it('Top NavLinks in App screen', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const favPksLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(homeLink).toBeDefined();
    expect(aboutLink).toBeDefined();
    expect(favPksLink).toBeDefined();
  });

  it('Click on home link redirects to initial app page', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);

    expect(history.location.pathname).toBe('/');
  });

  it('Click on about link redirects to about page', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);

    expect(history.location.pathname).toBe('/about');
  });

  it('Click on fav Pks link redirects to Favorite Pokémons page', () => {
    const { history } = renderWithRouter(<App />);
    const favPksLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favPksLink);

    expect(history.location.pathname).toBe('/favorites');
  });

  it('Wrong url redirects to Not Found page', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/wrongUrl');

    expect(history.location.pathname).toBe('/wrongUrl');
    const NotFoundText = screen.getByRole('heading',
      { name: /Page requested not found/ });

    expect(NotFoundText).toBeInTheDocument();
  });
});
