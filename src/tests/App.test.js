import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa se o navBar funciona devidamente', () => {
  test('Verifica o texto, e se o link Home funciona devidamente', () => {
    const { history } = renderWithRouter(<App />);
    const getHome = screen.getByText(/Home/);

    expect(getHome).toBeInTheDocument();
    fireEvent.click(getHome);
    expect(history.location.pathname).toBe('/');
  });

  test('Verifica o texto, e se o link About funciona devidamente', () => {
    const { history } = renderWithRouter(<App />);
    const getAbout = screen.getByRole('link', { name: /about/i });

    expect(getAbout).toBeInTheDocument();
    fireEvent.click(getAbout);
    expect(history.location.pathname).toBe('/about');
  });

  test('Verifica o texto, e se o link Favorite Pokémons funciona devidamente', () => {
    const { history } = renderWithRouter(<App />);
    const getFavorite = screen.getByText(/Favorite Pokémons/);

    expect(getFavorite).toBeInTheDocument();
    fireEvent.click(getFavorite);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Verifica se a aplicação é redirecionada em links inexistentes', () => {
    const { history } = renderWithRouter(<App />);

    history.push('randomURL');
    const getRandom = screen.getByText(/Page requested/i);
    expect(getRandom).toBeInTheDocument();
  });
});
