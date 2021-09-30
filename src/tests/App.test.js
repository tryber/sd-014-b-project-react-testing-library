import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 1 - topo da aplicação', () => {
  test('Verifica se o link tem "About Pokédex", "Favorite Pokemóns" e "Home"', () => {
    renderWithRouter(<App />);

    const homeText = screen.getByRole('link', { name: 'Home' });
    expect(homeText).toBeInTheDocument();

    const aboutText = screen.getByRole('link', { name: 'About' });
    expect(aboutText).toBeInTheDocument();

    const favoriteText = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoriteText).toBeInTheDocument();
  });

  test('Se a aplicação é redirecionada para a pág inicial ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);
    const homeText = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeText);
    expect(history.location.pathname).toBe('/');
  });
});

test('Se a aplicação é direcionada para a página About ao clicar no link About', () => {
  const { history } = renderWithRouter(<App />);
  const aboutText = screen.getByRole('link', { name: 'About' });
  userEvent.click(aboutText);
  expect(history.location.pathname).toBe('/about');
});

test('Se a apl é direcionada à página favorites ao clicar em Favorites Pokémons', () => {
  const { history } = renderWithRouter(<App />);
  const favoriteText = screen.getByRole('link', { name: 'Favorite Pokémons' });
  userEvent.click(favoriteText);
  expect(history.location.pathname).toBe('/favorites');
});
