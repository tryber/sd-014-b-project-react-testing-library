import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('1 - Testa o componente App.js', () => {
  test('Verifica se o primeiro link possui o texto home', () => {
    renderWithRouter(<App />);
    const elementLinkHome = screen.getByRole('link', {
      name: /home/i,
    });
    expect(elementLinkHome).toBeInTheDocument();
  });

  test('Verifica se o segundo link deve possuir o texto about', () => {
    renderWithRouter(<App />);
    const elementLinkAbout = screen.getByRole('link', {
      name: /about/i,
    });
    expect(elementLinkAbout).toBeInTheDocument();
  });

  test('Verifica se o terceiro link deve possuir o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const elementLinkFavorite = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(elementLinkFavorite).toBeInTheDocument();
  });

  // Testes acrescentados - exemplo aula 15.3 da Maitê

  test('Verifica se a aplicação é redirecionada para a página inicial,'
   + 'na URL / ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const elementLinkHome = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(elementLinkHome);

    const pageTitleHome = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(pageTitleHome).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');
  });

  test('Verifica se a aplicação é redirecionada para a página de About,'
   + 'na URL / ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const elementLinkAbout = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(elementLinkAbout);

    const pageTitleAbout = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(pageTitleAbout).toBeInTheDocument();
    expect(history.location.pathname).toBe('/about');
  });

  test('Verifica se a aplicação é redirecionada para a página de Pokémons Favoritados,'
   + 'na URL/favorites ao clicar no link Favorite Pokémons da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const elementLinkFavorite = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    userEvent.click(elementLinkFavorite);

    const pageTitleFavoritePokemon = screen.getByRole('heading', {
      level: 2,
      name: /Favorite pokémons/i,
    });
    expect(pageTitleFavoritePokemon).toBeInTheDocument();
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Verifica se a aplicação é redirecionada para a página Not Found'
  + 'ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/rota-que-nao-existe');

    const notFoundPage = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(notFoundPage).toBeInTheDocument();
  });
});
