import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('1 - Testa o componente App.js', () => {
  test('Verifica se o primeiro link deve possuir o texto home', () => {
    renderWithRouter(<App />);
    const elementHome = screen.getByText(/home/i);
    expect(elementHome).toBeInTheDocument();
  });

  test('Verifica se o segundo link deve possuir o texto about', () => {
    renderWithRouter(<App />);
    const elementAbout = screen.getByText(/about/i);
    expect(elementAbout).toBeInTheDocument();
  });

  test('Verifica se o terceiro link deve possuir o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const elementFavorite = screen.getByText(/favorite pokémons/i);
    expect(elementFavorite).toBeInTheDocument();
  });
});
