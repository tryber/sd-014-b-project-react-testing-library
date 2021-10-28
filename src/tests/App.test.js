import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('1. Testes do App.js', () => {
  it('Testa os links', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    const linkAbout = screen.getByRole('link', { name: 'About' });
    const linkFavoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavoritePokemons).toBeInTheDocument();
  });

  it('Se ao clicar no "Home" é redirecionado para "/"', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });

    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });
  it('Se ao clicar no "About" é redirecionado para "/about"', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: 'About' });

    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });
  it('Se ao clicar no "Favorite Pokémons" é redirecionado para "/favorites"', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorites = screen.getByRole('link', { name: 'Favorite Pokémons' });

    userEvent.click(linkFavorites);
    expect(history.location.pathname).toBe('/favorites');
  });
  it('Se ao entrar em uma URL desconhecida é redirecionada para "Not Found"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-nao-existente');

    expect(history.location.pathname).toBe('/pagina-nao-existente');
    const pageNotFound = screen.getByRole('heading', {
      name: /Page requested not found/,
    });
    expect(pageNotFound).toBeInTheDocument();
  });
});
