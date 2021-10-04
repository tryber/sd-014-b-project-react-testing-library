import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente App.js', () => {
  it('deve conter um conjunto fixo de links de navegação no topo da aplicação', () => {
    renderWithRouter(<App />);

    const linkToHome = screen.getByRole('link', { name: 'Home' });
    const linkToAbout = screen.getByRole('link', { name: 'About' });
    const linkToFavorites = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(linkToHome).toBeInTheDocument();
    expect(linkToAbout).toBeInTheDocument();
    expect(linkToFavorites).toBeInTheDocument();
  });

  it('redirecionar para página inicial ao clicar em Home', () => {
    const { history } = renderWithRouter(<App />);

    const linkToHome = screen.getByRole('link', { name: 'Home' });

    userEvent.click(linkToHome);

    expect(history.location.pathname).toBe('/');
  });

  it('redirecionar para página About ao clicar em About', () => {
    const { history } = renderWithRouter(<App />);

    const linkToAbout = screen.getByRole('link', { name: 'About' });

    userEvent.click(linkToAbout);

    expect(history.location.pathname).toBe('/about');
  });

  it('redirecionar para página Pokémons Favoritos ao clicar em Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);

    const linkToFavorites = screen.getByRole('link', { name: 'Favorite Pokémons' });

    userEvent.click(linkToFavorites);

    expect(history.location.pathname).toBe('/favorites');
  });

  it('redireciona para a página `Not Found quando não uma rota correspondente', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rota-que-nao-existe');

    const textNotFound = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });

    expect(textNotFound).toBeInTheDocument();
  });
});
