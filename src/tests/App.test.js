import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Testa o App.js', () => {
  test('se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();

    const favLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favLink).toBeInTheDocument();
  });

  test('se a aplicação é redirecionada para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/nao-existe');

    const pageNotFoundText = screen.getByRole('heading', {
      level: 2 });
    expect(pageNotFoundText).toBeInTheDocument();
  });

  test('se ao clicar no link Home direciona para página incial', () => {
    const { history } = renderWithRouter(<App />);

    const pageHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(pageHome);

    expect(history.location.pathname).toBe('/');
  });

  test('se ao clicar no link About direciona para página About Pokédex', () => {
    const { history } = renderWithRouter(<App />);

    const pageAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(pageAbout);

    expect(history.location.pathname).toBe('/about');
  });

  test('se ao clicar em Favorite Pokémons direciona para página de Favoritos', () => {
    const { history } = renderWithRouter(<App />);

    const pageFav = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(pageFav);

    expect(history.location.pathname).toBe('/favorites');
  });
});
