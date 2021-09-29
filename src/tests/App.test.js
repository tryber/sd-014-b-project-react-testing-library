import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

describe('1 - Teste o componente <App.js />', () => {
  test(`Teste se o topo da aplicação contém um conjunto fixo de links de
  navegação`, () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    expect(linkHome).toBeInTheDocument();
    const linkAbout = screen.getByRole('link', { name: 'About' });
    expect(linkAbout).toBeInTheDocument();
    const linkFavorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkFavorites).toBeInTheDocument();
  });

  test(`Teste se a aplicação é redirecionada para a página inicial, na URL / ao
  clicar no link Home da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const homePage = screen.getByText(/Pokédex/);
    expect(homePage).toBeInTheDocument();
  });
  test(`Teste se a aplicação é redirecionada para a página de About, na URL /about,
  ao clicar no link About da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const aboutPage = screen.getByText(/About Pokédex/);
    expect(aboutPage).toBeInTheDocument();
  });
  test(`Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, na URL
  favorites, ao clicar no link Favorite Pokémons da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const aboutFavorites = screen.getByText(/Favorite pokémons/);
    expect(aboutFavorites).toBeInTheDocument();
  });
  test(`Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL 
  desconhecida.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const noMatch = screen.getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
