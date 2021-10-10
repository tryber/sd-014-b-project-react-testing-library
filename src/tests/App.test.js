import { screen, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import RenderWithRouter from '../RenderWithRouter';

describe('Teste o componente <App.js />', () => {
  it(`Teste se o topo da aplicação contém
  um conjunto fixo de links de navegação`, () => {
    RenderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });
  it(`Teste se a aplicação é redirecionada para a página inicial,
  na URL / ao clicar no link Home da barra de navegação.`, () => {
    const { history } = RenderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    fireEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it(`Teste se a aplicação é redirecionada para a página de About,
  na URL /about, ao clicar no link About da barra de navegação`, () => {
    const { history } = RenderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });
    fireEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it(`Teste se a aplicação é redirecionada para a página de Pokémons Favoritados,
  na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação`, () => {
    const { history } = RenderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    fireEvent.click(favoriteLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it(`Teste se a aplicação é redirecionada para a página
  Not Found ao entrar em uma URL desconhecida`, () => {
    const { history } = RenderWithRouter(<App />);
    history.push('/trybe');
    const notFound = screen.getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
