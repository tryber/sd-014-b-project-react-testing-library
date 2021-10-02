import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  it('deveria exibir o Link "Home"', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    expect(linkHome).toBeInTheDocument();
  });

  it('deveria exibir o Link "About"', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: 'About' });
    expect(linkAbout).toBeInTheDocument();
  });

  it('deveria exibir o Link "Favorite Pokémons"', () => {
    renderWithRouter(<App />);
    const linkFavoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkFavoritePokemons).toBeInTheDocument();
  });
});
