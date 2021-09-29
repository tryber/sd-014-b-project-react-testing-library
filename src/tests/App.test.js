import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('testanto se o App esta funcionando corretamente', () => {
  it('O primeiro link deve possuir o texto Home', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });
    const about = screen.getByRole('link', { name: 'About' });
    const favoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemons).toBeInTheDocument();
  });

  it('A aplicação é redirecionada para a página inicial ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });

    userEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });

  it('A aplicação é redirecionada para a About ao clicar no link About', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: 'About' });

    userEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  });

  it('Redireciona para a Pokémons Favoritados ao clicar no link Favorites', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });

    userEvent.click(favoritePokemons);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Redireciona para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notfound');

    expect(history.location.pathname).toBe('/notfound');
    const notFound = screen.getByRole('heading', {
      name: /Page requested not found/,
      level: 2,
    });
    expect(notFound).toBeInTheDocument();
  });
});
