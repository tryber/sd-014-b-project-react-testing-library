import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import App from '../App';

describe('App.js testcase:', () => {
  test('se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: 'Home' });
    expect(home).toBeInTheDocument();

    const about = screen.getByRole('link', { name: 'About' });
    expect(about).toBeInTheDocument();

    const favorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favorites).toBeInTheDocument();
  });

  test(`se a aplicação é redirecionada para a página inicial,
  na URL / ao clicar no link Home da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: 'Home' });
    userEvent.click(home);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test(`se a aplicação é redirecionada para a página de About,
   na URL /about, ao clicar no link About da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);

    const about = screen.getByRole('link', { name: 'About' });
    userEvent.click(about);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test(`se a aplicação é redirecionada para a página de Pokémons Favoritados,
   na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);

    const favorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favorites);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test(`se a aplicação é redirecionada para a página Not Found
    ao entrar em uma URL desconhecida.`, () => {
    const { history } = renderWithRouter(<App />);

    history.push('/paginainexistente');
    const { pathname } = history.location;
    expect(pathname).toMatch('/paginainexistente');

    const notFound = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found Crying emoji/i,
    });
    expect(notFound).toBeInTheDocument();
  });
});
