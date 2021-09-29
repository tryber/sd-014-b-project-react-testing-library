import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Teste o componente <App.js />', () => {
  test('Se o topo da aplicação contém um conjunto fixo de links de navegação.',
    () => {
      renderWithRouter(<App />);
      const homeRouter = screen.getByRole('link', { name: 'Home' });
      expect(homeRouter).toBeInTheDocument();

      const aboutRouter = screen.getByRole('link', { name: 'About' });
      expect(aboutRouter).toBeInTheDocument();

      const favoriteRouter = screen.getByRole('link', { name: 'Favorite Pokémons' });
      expect(favoriteRouter).toBeInTheDocument();
    });

  test(`Se a aplicação é redirecionada para a página inicial, na URL / ao clicar no
    link Home da barra de navegação.`,
  () => {
    const { history } = renderWithRouter(<App />);
    const homeRouter = screen.getByRole('link', { name: 'Home' });
    fireEvent.click(homeRouter);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test(`Teste se a aplicação é redirecionada para a página de About, na URL /about,
  ao clicar no link About da barra de navegação.`,
  () => {
    const { history } = renderWithRouter(<App />);
    const aboutRouter = screen.getByRole('link', { name: 'About' });
    fireEvent.click(aboutRouter);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test(`Teste se a aplicação é redirecionada para a página de Pokémons Favoritados,
   na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const favoriteRouter = screen.getByRole('link', { name: 'Favorite Pokémons' });
    fireEvent.click(favoriteRouter);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test(`Teste se a aplicação é redirecionada para a página Not Found ao entrar em
   uma URL desconhecida.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/page-not-found');
    const notFoundRouter = screen.getByText(/Page requested not found/i);
    expect(notFoundRouter).toBeInTheDocument();
  });
});
