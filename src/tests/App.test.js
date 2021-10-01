import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Verifica se contém um conjunto fixo de links de navegação', () => {
  it('Should have link Home', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByText('Home');
    expect(linkHome).toBeInTheDocument();
  });

  it('Should have link About', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByText('About');
    expect(linkAbout).toBeInTheDocument();
  });

  it('Should have link Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const linkFavoritePokemon = screen.getByText('Favorite Pokémons');
    expect(linkFavoritePokemon).toBeInTheDocument();
  });
});
