import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o Componente "App"', () => {
  test('se o topo da aplicação contém um conjunto fixo de links de navegação.', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });
    const about = screen.getByRole('link', { name: 'About' });
    const favoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemons).toBeInTheDocument();
  });

  test(`se a aplicação é redirecionada para a página inicial, 
  na URL "/" ao clicar no link "Home" da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });
    userEvent.click(home);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/');
  });

  test(`se a aplicação é redirecionada para a página de "About", 
  na URL "/about", ao clicar no link "About" da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: 'About' });
    userEvent.click(about);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/about');
  });

  test(`se a aplicação é redirecionada para a página de "Pokémons Favoritados", 
  na URL "/favorites", ao clicar no link "Favorite Pokémons"
  da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoritePokemons);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/favorites');
  });

  test(`se a aplicação é redirecionada para a página Not Found
  ao entrar em uma URL desconhecida.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');
    const pageNotFound = screen
      .getByRole('heading', { level: 2, name: /Page requested not found/i });
    expect(pageNotFound).toBeInTheDocument();
    const img = screen
      .getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(img).toBeInTheDocument();
  });
});
