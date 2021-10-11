import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  test('Testa se o topo da aplicação contém um conjunto fixo de links de navegação.',
    () => {
      renderWithRouter(<App />);
      const nav = screen.getByRole('navigation');

      expect(nav).toBeInTheDocument();
    });

  test('Testa se o primeiro link possuí o texto Home', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'Home' });

    expect(link).toBeInTheDocument();
  });

  test('Testa se o segundo link possuí o texto About', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'About' });

    expect(link).toBeInTheDocument();
  });

  test('Testa se o terceiro link possuí o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(link).toBeInTheDocument();
  });
});
