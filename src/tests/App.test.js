import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente App.js', () => {
  test('se o topo da aplicação contém um conjunto fixo de links de navegação',
    () => {
      renderWithRouter(<App />);
      const homeLink = screen.getByRole('link', { name: 'Home' });
      const aboutLink = screen.getByRole('link', { name: 'About' });
      const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

      expect(homeLink).toBeInTheDocument();
      expect(aboutLink).toBeInTheDocument();
      expect(favoriteLink).toBeInTheDocument();
    });

  test(`se a aplicação é redirecionada para a página de About,
    na URL /about, ao clicar no link About da barra de navegação`, () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });

    fireEvent.click(aboutLink);

    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  test(`se a aplicação é redirecionada para a página de Pokémons Favoritados,
    na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação`,
  () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

    fireEvent.click(favoriteLink);

    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  test(`se a aplicação é redirecionada para a página Not Found ao entrar em uma
    URL desconhecida`, () => {
    const { history } = renderWithRouter(<App />);

    history.push('/fgo');

    const notFound = screen.getByText(/Page requested not found /i);

    expect(notFound).toBeInTheDocument();
  });
});
