import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import App from '../App';

describe('Testando o componente App.js', () => {
  test(' se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const history = createMemoryHistory();
    render(<Router history={ history }><App /></Router>);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoriteLink).toBeInTheDocument();
  });

  test('se ao clicar em "Home" é redirecionado para a URL "/"', () => {
    const history = createMemoryHistory();
    render(<Router history={ history }><App /></Router>);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });

  test('ao clicar em "About" é redirecionado para a URL "/about"', () => {
    const history = createMemoryHistory();
    render(<Router history={ history }><App /></Router>);
    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  test('ao clicar em "Favorite Pokémons" é redirecionado para a URL "/favorites"', () => {
    const history = createMemoryHistory();
    render(<Router history={ history }><App /></Router>);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteLink);
    expect(history.location.pathname).toBe('/favorites');
  });
});
