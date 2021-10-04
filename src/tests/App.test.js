import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste do componente App.js', () => {
  test('a aplicação contem links de navegação fixos', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoriteLink).toBeInTheDocument();
  });
  test('Ao clicar no link Home a aplicação é redirecionada para a pagina inicial', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });

    userEvent.click(homeLink);

    expect(history.location.pathname).toBe('/');
  });
  test('Ao clicar no link About a aplicação é redirecionada para a pagina sobre', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });

    userEvent.click(aboutLink);

    expect(history.location.pathname).toBe('/about');
  });
  test(`Ao clicar no link Favorite Pokémons
   a aplicação é redirecionada para a pagina de favoritos`, () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

    userEvent.click(favoriteLink);

    expect(history.location.pathname).toBe('/favorites');
  });
  test(`Ao entrar em uma URL sem rota
   a aplicação é redirecionada para a pagina Not Found`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/zzzz');

    const notFoundTitle = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });
    expect(notFoundTitle).toBeInTheDocument();
  });
});
