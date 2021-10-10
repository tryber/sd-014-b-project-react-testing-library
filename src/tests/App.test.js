import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  it('deveria possuir o texto Home', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByText(/Home/i);
    expect(linkHome).toBeInTheDocument();
  });
  it('deveria possuir o texto About', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByText(/About/i);
    expect(linkAbout).toBeInTheDocument();
  });
  it('deveria possuir o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const linkFavorite = screen.getByText(/Favorite Pokémons/i);
    expect(linkFavorite).toBeInTheDocument();
  });
});

describe('se a aplicação é redirecionada para a página', () => {
  it('deveria ser redirecionada para a página inicial ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByText(/Home/i);
    userEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('deveria ser redirecionada para a página de About ao clicar no link About', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByText(/About/i);
    userEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('deveria ser redirecionad para a página Favorite ao clicar no link Favorite', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorite = screen.getByText(/Favorite Pokémons/i);
    userEvent.click(linkFavorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it('redireciona para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pagina/que-nao-existe/');

    const notFoundTitle = screen.getByText(/Page requested not found/i);
    expect(notFoundTitle).toBeInTheDocument();
  });
});
