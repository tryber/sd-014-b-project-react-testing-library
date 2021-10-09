import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('Requisito 1.1 - Verifica a existência de links em <App />',
  () => {
    beforeEach(() => {
      renderWithRouter(<App />);
    });

    test('verifica se existe um link com o texto "Home" ', () => {
      const homeLink = screen.getByText('Home');

      expect(homeLink).toBeInTheDocument();
    });

    test('verifica se existe um link com o texto "About" ', () => {
      const aboutLink = screen.getByText('About');

      expect(aboutLink).toBeInTheDocument();
    });

    test('verifica se existe um link com o texto "Favorite Pokémons" ', () => {
      const favoritePokémonsLink = screen.getByText('Favorite Pokémons');

      expect(favoritePokémonsLink).toBeInTheDocument();
    });
  });

describe('Requisito 1.2 - Verifica o comportamento dos links', () => {
  let navHistory;
  beforeEach(() => {
    navHistory = renderWithRouter(<App />).history;
  });

  test('verifica se o link "Home" redireciona para URL "/"', () => {
    const linkToHome = screen.getByRole('link', { name: 'Home' });
    expect(linkToHome).toBeInTheDocument();

    fireEvent.click(linkToHome);
    const urlAtual = navHistory.location.pathname;
    expect(urlAtual).toStrictEqual('/');
  });

  test('verifica se o link "About" redireciona para URL "/about"', () => {
    const linkToAbout = screen.getByRole('link', { name: 'About' });
    expect(linkToAbout).toBeInTheDocument();

    fireEvent.click(linkToAbout);
    const urlAtual = navHistory.location.pathname;
    expect(urlAtual).toStrictEqual('/about');
  });

  test('verifica se o link "Favorite Pokémons" redireciona para URL "/favorites"', () => {
    const linkToFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkToFavorite).toBeInTheDocument();

    fireEvent.click(linkToFavorite);
    const urlAtual = navHistory.location.pathname;
    expect(urlAtual).toStrictEqual('/favorites');
  });

  test('se ao entrar com uma URL desconhecida redireciona para "Not Found"', () => {
    navHistory.push('/url-desconhecida');
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
