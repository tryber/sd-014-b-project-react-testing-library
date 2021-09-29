import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa se o topo da aplicação contém links de navegação', () => {
  test('Se possui um link "Home" e testa sua rota', () => {
    const { history } = renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: 'Home' });
    expect(home).toBeInTheDocument();
    fireEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Se possui um link "About" e testa sua rota', () => {
    const { history } = renderWithRouter(<App />);

    const about = screen.getByRole('link', { name: 'About' });
    expect(about).toBeInTheDocument();
    fireEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Se possui um link "Favorite Pokémons" e testa sua rota', () => {
    const { history } = renderWithRouter(<App />);

    const favorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favorites).toBeInTheDocument();
    fireEvent.click(favorites);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Se é renderizada a página de "Not Found" para uma página não encontrada', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/naoencontrada');
    const noMatch = screen.getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
