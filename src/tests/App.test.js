import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import App from '../App';

describe('App.js tests', () => {
  it('Top NavLinks in App screen', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const favPksLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(homeLink).toBeDefined();
    expect(aboutLink).toBeDefined();
    expect(favPksLink).toBeDefined();
  });
});
