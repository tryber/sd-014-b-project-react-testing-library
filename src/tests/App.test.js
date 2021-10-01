import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('1 - Testando o componente App.js', () => {
  it('Testa se o topo da aplicação contém um conjunto de links de navegação', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    const linkAbout = screen.getByRole('link', { name: 'About' });
    const linkFavoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavoritePokemons).toBeInTheDocument();
  });
  it('Ao clicar no `Home` é redirecionado para o caminho esperado', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });

    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });
  it('Ao clicar no `About` é redirecionado para o caminho esperado', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: 'About' });

    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });
  it('Ao clicar no `Favorite Pokémons` é redirecionado para o caminho esperado', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });

    userEvent.click(linkFavoritePokemons);
    expect(history.location.pathname).toBe('/favorites');
  });
  it('Verifica se ao digitar um caminho não existente é retornado Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-nao-existente');

    expect(history.location.pathname).toBe('/pagina-nao-existente');
    const pageNotFound = screen.getByRole('heading', {
      name: /Page requested not found/,
      level: 2,
    });
    expect(pageNotFound).toBeInTheDocument();
  });
});
