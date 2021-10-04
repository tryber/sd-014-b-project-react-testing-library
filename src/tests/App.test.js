import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('app.js tests set', () => {
  it('should the application top has a set of links', () => {
    // Teste se o topo da aplicação contém um conjunto fixo de links de navegação.
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const textLinkHome = screen.getByRole('link', { name: /home/i });
    const textLinkAbout = screen.getByRole('link', { name: /about/i });
    const textLinkFavorite = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(textLinkHome).toBeInTheDocument();
    expect(textLinkAbout).toBeInTheDocument();
    expect(textLinkFavorite).toBeInTheDocument();
  });

  it('should the click in the link Home will'
  + ' redirects to the sites beginning', () => {
    // Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação.
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const textLinkHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(textLinkHome);
    const textToBeInHome = screen.getByRole('heading', {
      level: 2, name: /encountered pokémons/i });
    expect(textToBeInHome).toBeInTheDocument();
  });

  it('should the click in the link About will'
  + ' redirects to the sites page correctly', () => {
    // Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const textLinkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(textLinkAbout);
    const textToBeInAbout = screen.getByRole('heading', {
      level: 2, name: /about pokédex/i });
    expect(textToBeInAbout).toBeInTheDocument();
  });

  it('should the click in the link Favorite Pokémon will'
  + ' redirects to the sites page correctly', () => {
    // Teste se a aplicação é redirecionada para a página de Pokémons Favoritados na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const textLinkFavorite = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(textLinkFavorite);
    const textToBeInFavorite = screen.getByRole('heading', {
      level: 2, name: /favorite pokémons/i });
    expect(textToBeInFavorite).toBeInTheDocument();
  });

  it('should a wrong url redirectly to the not found page', () => {
    // Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.
    const customHistory = createMemoryHistory();

    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    customHistory.push('/not-found-route');
    const textNotFound = screen.getByRole('heading', {
      level: 2, name: /page requested not found/i });
    expect(textNotFound).toBeInTheDocument();
  });
});
