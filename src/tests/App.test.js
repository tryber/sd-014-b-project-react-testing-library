import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente "<App.js>"', () => {
  it('Deveria possuir o Texto "Home" no primeiro link', () => {
    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const linkOne = screen.getAllByRole('link')[0];
    expect(linkOne).toHaveTextContent('Home');
  });

  it('Deveria possuir o Texto "About" no segundo link', () => {
    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const linkTwo = screen.getAllByRole('link')[1];
    expect(linkTwo).toHaveTextContent('About');
  });

  it('Deveria possuir o Texto "Favorite Pokémons" no terceiro link', () => {
    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const linkThree = screen.getAllByRole('link')[2];
    expect(linkThree).toHaveTextContent('Favorite Pokémons');
  });

  it(`Deveria redirecionar para a página inicial na URL / ao clicar
  no link "Home"`, () => {
    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const linkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHome);

    const subtitle = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });

    expect(history.location.pathname).toBe('/');
    expect(subtitle).toBeInTheDocument();
  });

  it(`Deveria redirecionar para a página "about" na URL "/about" ao clicar
  no link "About"`, () => {
    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);

    const subtitle = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(history.location.pathname).toBe('/about');
    expect(subtitle).toBeInTheDocument();
  });

  it(`Deveria redirecionar para a página "Pokémons Favoritados" na URL "/favorites"
  ao clicar no link "Favorite Pokémons"`, () => {
    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const linkFavoritesPokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavoritesPokemons);

    const subtitle = screen.getByRole('heading', {
      level: 2,
      name: 'Favorite pokémons',
    });

    expect(history.location.pathname).toBe('/favorites');
    expect(subtitle).toBeInTheDocument();
  });

  /**
   * Consultei o repositorio do Levi Manoel para entender a melhor forma de capturar
   * o texto "Not Found"
   * Link: 'https://github.com/tryber/sd-014-b-project-react-testing-library/pull/109/
   * commits/069f2ba3192acf230e1990562fc383d1e8bd76bc'
   */
  it(`Deveria redirecionar para a página "Not Found" ao entrar em uma URL
  desconhecida.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/url-desconhecida');

    const textAltImageNotFound = screen
      .getByAltText('Pikachu crying because the page requested was not found');

    expect(textAltImageNotFound).toBeInTheDocument();
  });
});
