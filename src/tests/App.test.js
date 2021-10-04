import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa a aplicação do component App', () => {
  test('se a aplicação é redirecionada para a página inicial', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHome);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/');
  });

  test('se a aplicação é redirecionada para a página de About', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/about');
  });

  test('se a aplicação é redirecionada para a página de Pokémons Favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavorites);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/favorites');
  });
});
