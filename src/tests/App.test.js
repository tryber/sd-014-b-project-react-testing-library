import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  test('o topo da aplicação contém um conjunto fixo de links de navegação.', () => {
    const history = createMemoryHistory();
    render(<Router history={ history }><App /></Router>);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  test(`aplicação é redirecionada para a página inicial,
  na URL / ao clicar no link Home da barra de navegação.`, () => {
    const history = createMemoryHistory();
    render(<Router history={ history }><App /></Router>);

    fireEvent.click(screen.getByText('Home'));
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  test(`a aplicação é redirecionada para a página de About,
  na URL /about, ao clicar no link About da barra de navegação`, () => {
    const history = createMemoryHistory();
    render(<Router history={ history }><App /></Router>);

    fireEvent.click(screen.getByText('About'));
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  test(`aplicação é redirecionada para a página de Pokémons Favoritados,
  na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação`, () => {
    const history = createMemoryHistory();
    render(<Router history={ history }><App /></Router>);

    fireEvent.click(screen.getByText('Favorite Pokémons'));
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });
});
