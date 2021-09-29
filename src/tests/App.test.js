import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente App', () => {
  test('se a aplicação é redirecionada para a página Inicial', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: 'Home' }));
    expect(history.location.pathname).toBe('/');
  });

  test('se a aplicação é redirecionada para a página About', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: 'About' }));
    expect(history.location.pathname).toBe('/about');
  });

  test('se a aplicação é redirecionada para a página Pokémons Favoritados', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));
    expect(history.location.pathname).toBe('/favorites');
  });

  test('se a aplicação é redirecionada para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-que-não-existe');
    expect(history.location.pathname).toBe('/pagina-que-não-existe');
  });
});
