import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Testando requisito 1, testando os links do app', () => {
  test('Testa se os links home,about e favorites estão sendo exibidos na pagina inicial',
    () => {
      renderWithRouter(<App />);

      const linkHome = screen.getByRole('link', { name: 'Home' });
      expect(linkHome).toBeInTheDocument();

      const linkAbout = screen.getByRole('link', { name: 'About' });
      expect(linkAbout).toBeInTheDocument();

      const linkFavorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
      expect(linkFavorites).toBeInTheDocument();
    });

  test('Testa se o usuario é direcionado para a pagina home ao clicar no link',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkHome = screen.getByRole('link', { name: 'Home' });

      userEvent.click(linkHome);

      expect(history.location.pathname).toBe('/');
    });

  test('Testa se o usuario é direcionado para a pagina about ao clicar no link',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkAbout = screen.getByRole('link', { name: 'About' });

      userEvent.click(linkAbout);

      expect(history.location.pathname).toBe('/about');
    });

  test('Testa se o usuario é direcionado para a pagina favorites ao clicar no link',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkFavorites = screen.getByRole('link', { name: 'Favorite Pokémons' });

      userEvent.click(linkFavorites);

      expect(history.location.pathname).toBe('/favorites');
    });

  test(`Testa se o usuario é redirecionado a página not found caso nao for uma rota
   correspondete`,
  () => {
    const { history } = renderWithRouter(<App />);
    history.push('/404-not-found');

    expect(history.location.pathname).toBe('/404-not-found');

    const notFound404 = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });

    expect(notFound404).toBeInTheDocument();
  });
});
