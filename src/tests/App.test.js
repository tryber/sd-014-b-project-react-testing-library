import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Verifica se o topo da aplicação contém um conjunto fixo de links de navegação.',
  () => {
    it('Deve possuir o link "Home"', () => {
      renderWithRouter(<App />);
      const linkToHome = screen.getByText('Home');
      expect(linkToHome).toBeInTheDocument();
    });
    it('Deve possuir o link "About"', () => {
      renderWithRouter(<App />);
      const linkToAbout = screen.getByText('About');
      expect(linkToAbout).toBeInTheDocument();
    });
    it('Deve possuir o link "Favorite Pokémons"', () => {
      renderWithRouter(<App />);
      const linkToFavPokemons = screen.getByText('Favorite Pokémons');
      expect(linkToFavPokemons).toBeInTheDocument();
    });
  });

describe('Testa todas as rotas das URLs nos links da aplicação', () => {
  it('Caso clique em "Home", redireciona para "/"', () => {
    const { history } = renderWithRouter(<App />);
    const linkToHome = screen.getByText('Home');
    userEvent.click(linkToHome);
    expect(history.location.pathname).toBe('/');
  });
  it('Caso clique em "About", redireciona para "/about"', () => {
    const { history } = renderWithRouter(<App />);
    const linkToAbout = screen.getByText('About');
    userEvent.click(linkToAbout);
    expect(history.location.pathname).toBe('/about');
  });
  it('Caso clique em "Favorite Pokemons", redireciona para "/favorites"', () => {
    const { history } = renderWithRouter(<App />);
    const linkToFavPokemons = screen.getByText('Favorite Pokémons');
    userEvent.click(linkToFavPokemons);
    expect(history.location.pathname).toBe('/favorites');
  });
  it('Redireciona para pageNotFound se a URL for desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/page-not-found');
    const pageNotFound = screen.getByText('Page requested not found');
    expect(pageNotFound).toBeInTheDocument();
  });
});
