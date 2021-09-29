import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente App', () => {
  test('se o topo da aplicação contem links de navegação', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    expect(linkHome).toBeInTheDocument();
    const linkAbout = screen.getByRole('link', { name: 'About' });
    expect(linkAbout).toBeInTheDocument();
    const linkFavorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkFavorites).toBeInTheDocument();
  });

  test('se ao clicar em Home a aplicação é redirecionada para a página inicial', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHome);
    const url = history.location.pathname;
    expect(url).toBe('/');
    const textEncontered = screen.getByRole(
      'heading', {
        name: 'Encountered pokémons',
        level: 2 },
    );
    expect(textEncontered).toBeInTheDocument();
  });

  test('se ao clicar em About a aplicação é redirecionada para about', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);
    const url = history.location.pathname;
    expect(url).toBe('/about');
    const textAbout = screen.getByText(/About Pokédex/i);
    expect(textAbout).toBeInTheDocument();
  });

  test('se ao clicar em Favorite Pokémons redireciona para Favorites', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavorites);
    const url = history.location.pathname;
    expect(url).toBe('/favorites');
    const textFavorites = screen.getByRole(
      'heading', {
        name: 'Favorite pokémons',
        level: 2 },
    );
    expect(textFavorites).toBeInTheDocument();
  });
});
