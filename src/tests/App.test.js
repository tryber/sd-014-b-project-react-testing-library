import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa se o topo da aplicação contém um conjunto fixo de links de navegação',
  () => {
    test('se há no índice o link Home', () => {
      renderWithRouter(<App />);
      const linkHome = screen.getByRole('link', { name: 'Home' });
      expect(linkHome).toBeInTheDocument();
    });

    test('se há no índice o link About', () => {
      renderWithRouter(<App />);
      const linkAbout = screen.getByRole('link', { name: 'About' });
      expect(linkAbout).toBeInTheDocument();
    });

    test('se há no índice o link About', () => {
      renderWithRouter(<App />);
      const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
      expect(linkFavorite).toBeInTheDocument();
    });
  });

describe('Testa as rotas das URLs dos links', () => {
  test('Se ao clicar em Home, redireciona para o path /', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });

  test('Se ao clicar em About, redireciona para o path /about', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });

  test('Se ao clicar em Favorites Pókemons, redireciona para o path /favorites', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavorites);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Se redireciona para a página NotFound caso a URL seja desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/page-not-found');
    const pageNotFound = screen.getByText('Page requested not found');
    expect(pageNotFound).toBeInTheDocument();
  });
});
