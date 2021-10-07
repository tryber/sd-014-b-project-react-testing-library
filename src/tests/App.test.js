import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './services/renderWithRouter';

describe('Testa o componente <App.js />', () => {
  it('Deveria, no topo da aplicação, conter links de navegação', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const favoritesLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritesLink).toBeInTheDocument();
  });
});
