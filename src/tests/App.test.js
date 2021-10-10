import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

describe('Testa o primeiro requisito', () => {
  test('verifica se o texto dos links estão corretos', () => {
    renderWithRouter(<App />);

    const textHome = screen.getByRole('link', { name: 'Home' });
    expect(textHome).toBeInTheDocument();

    const textAbout = screen.getByRole('link', { name: 'About' });
    expect(textAbout).toBeInTheDocument();

    const textFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(textFavorite).toBeInTheDocument();
  });

  test('Verifica se a aplicação é redirecionada para a página inicial, na URL /`',
    () => {
      const { history } = renderWithRouter(<App />);
      const homeLink = screen.getByRole('link', { name: 'Home' });

      userEvent.click(homeLink);
      expect(history.location.pathname).toBe('/');
    });

  test('Verifica se a aplicação é redirecionada para a página de About, na URL /about',
    () => {
      const { history } = renderWithRouter(<App />);
      const aboutLink = screen.getByRole('link', { name: 'About' });

      userEvent.click(aboutLink);
      expect(history.location.pathname).toBe('/about');
    });

  test('Verifica se a aplicação é redirecionada para a página de Pokémons Favoritados',
    () => {
      const { history } = renderWithRouter(<App />);
      const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

      userEvent.click(favoriteLink);
      expect(history.location.pathname).toBe('/favorites');
    });

  test('Verifica se a aplicação é redirecionada para a página Not Found',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/url não encontrada');
    });
});
