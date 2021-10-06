import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('01 - Teste o componente <App.js />', () => {
  test('a) O primeiro link deve possuir o texto Home', () => {
    renderWithRouter(<App />);

    const firstLink = screen.getAllByRole('link');
    expect(firstLink[0]).toHaveTextContent('Home');
  });

  test('b) O segundo link deve possuir o texto About', () => {
    renderWithRouter(<App />);

    const secondLink = screen.getAllByRole('link');
    expect(secondLink[1]).toHaveTextContent('About');
  });

  test('c) O terceiro link deve possuir o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);

    const thirdLink = screen.getAllByRole('link');
    expect(thirdLink[2]).toHaveTextContent('Favorite Pokémons');
  });

  test('d) Se a aplicação cai na URL / ao clicar no link Home.', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });

  test('e) Se a aplicação cai na URL /about ao clicar no link About.', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  test('f) Se a aplicação cai na URL /favorites ao clicar no link Favorite Pokémons.',
    () => {
      const { history } = renderWithRouter(<App />);

      const favoritesLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
      userEvent.click(favoritesLink);
      expect(history.location.pathname).toBe('/favorites');
    });

  test('g) Se <NotFound /> renderiza ao acessar uma rota inexistente.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/not-found');

    const notFoundText = screen.getByRole('heading',
      { level: 2, name: 'Page requested not found Crying emoji' });
    expect(notFoundText).toBeInTheDocument();
  });
});
