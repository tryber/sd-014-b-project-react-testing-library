import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

// Ideia dos testes tirada da aula ao vivo com Maitê (Tribo 14 A)
describe('Teste o componente <App.js />', () => {
  test('Teste se o topo da aplicação contém um conjunto '
  + 'fixo de links de navegação.', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();

    const favoritesLink = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favoritesLink).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página inicial', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Teste se a aplicação é redirecionada para a página de About', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Teste se a aplicação é redirecionada Pokémons Favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const favoritesLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritesLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Teste se a aplicação é redirecionada para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/paginaNotFound');

    const notFound = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(notFound).toBeInTheDocument();
  });
});
