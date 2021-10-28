import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa se no topo da aplicação contém um conjunto fixo de links de navegação',
  () => {
    test('se há o link Home', () => {
      renderWithRouter(<App />);
      const linkToHome = screen.getByRole('link', { name: 'Home' });
      expect(linkToHome).toBeInTheDocument();
    });

    test('se há o link About', () => {
      renderWithRouter(<App />);
      const linkToAbout = screen.getByRole('link', { name: 'About' });
      expect(linkToAbout).toBeInTheDocument();
    });

    test('se há o link About', () => {
      renderWithRouter(<App />);
      const linkToFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
      expect(linkToFavorite).toBeInTheDocument();
    });
  });

describe('Testa as rotas dos links', () => {
  test('Se ao clicar em Home, redireciona para o path /', () => {
    const { history } = renderWithRouter(<App />);
    const linkToHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkToHome);
    expect(history.location.pathname).toBe('/');
  });

  test('Se ao clicar em About, redireciona para o path /about', () => {
    const { history } = renderWithRouter(<App />);
    const linkToAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkToAbout);
    expect(history.location.pathname).toBe('/about');
  });

  test('Se ao clicar em Favorites Pókemons, redireciona para o path /favorites', () => {
    const { history } = renderWithRouter(<App />);
    const linkToFavorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkToFavorites);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Se redireciona para a página NotFound ao entrar URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/page-not-found');
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
