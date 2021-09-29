import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa se o topo da aplicação contém links de navegação', () => {
  test('Se possui os links com os textos Home, About e Favorite Pokémons', () => {
    renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: 'Home' });
    expect(home).toBeInTheDocument();

    const about = screen.getByRole('link', { name: 'About' });
    expect(about).toBeInTheDocument();

    const favorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favorites).toBeInTheDocument();
  });
});
