import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 1 - Teste o componente App', () => {
  test('verifica se o primero link possui o texto Home', () => {
    renderWithRouter(<App />);
    const homeToLink = screen.getByRole('link', { name: 'Home' });

    expect(homeToLink).toBeInTheDocument();
  });

  test('verifica se o segundo link possui o texto About', () => {
    renderWithRouter(<App />);
    const aboutToLink = screen.getByRole('link', { name: 'About' });
    expect(aboutToLink).toBeInTheDocument();
  });

  test('verifica se o terceiro link possui o texto Favorite Pokemons', () => {
    renderWithRouter(<App />);
    const favoriteToLinkPokemons = screen.getByRole('link',
      { name: 'Favorite Pokémons' });

    expect(favoriteToLinkPokemons).toBeInTheDocument();
  });
});
