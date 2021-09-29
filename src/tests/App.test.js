import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('1 - Quando a Aplicação inicializa', () => {
  it('Será validado se os links de navegação são exibidos na página de pesquisa', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: 'Home' });
    expect(linkHome).toBeInTheDocument();
    expect(linkHome).toHaveTextContent('Home');

    const linkAbout = screen.getByRole('link', { name: 'About' });
    expect(linkAbout).toBeInTheDocument();
    expect(linkAbout).toHaveTextContent('About');

    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkFavorite).toBeInTheDocument();
    expect(linkFavorite).toHaveTextContent('Favorite Pokémons');
  });

  it('Será validado se a navegação para o Home ocorre corretamente', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Será validado se a navegação para o About ocorre corretamente"', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Será validado se a navegação para o Favorite Pokémons ocorre corretamente"', () => {
    const { history } = renderWithRouter(<App />);

    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(linkFavorite);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
