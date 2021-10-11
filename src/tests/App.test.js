import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa a aplicação App', () => {
  test('Se é renderizado o conjunto de links Home, About e Favorite Pokémons', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: 'Home',
    });
    const aboutLink = screen.getByRole('link', {
      name: 'About',
    });
    const favPokeLink = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favPokeLink).toBeInTheDocument();
  });

  test('Se a página é redirecionada para / quando clica em Home', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: 'Home',
    });
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });

  test('Se a página é redirecionada para /about pelo link About', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', {
      name: 'About',
    });
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  test('Se a página é redirecionada para /favorites pelo link Favorites', () => {
    const { history } = renderWithRouter(<App />);

    const favPokeLink = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    userEvent.click(favPokeLink);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Se é direcionada para a página Not Found ao entrar em URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/rota-que-nao-existe');
    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });
    expect(notFoundText).toBeInTheDocument();
  });
});
