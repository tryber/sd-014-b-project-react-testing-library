import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Requisito 01', () => {
  it('O primeiro link deve possuir o texto Home', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByText('Home');
    expect(linkHome).toBeInTheDocument();
  });

  it('O segundo link deve possuir o texto About', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByText('About');
    expect(linkAbout).toBeInTheDocument();
  });

  it('O terceiro link deve possuir o texto Favorite Pokémons.', () => {
    renderWithRouter(<App />);
    const linkPokemons = screen.getByText('Favorite Pokémons');
    expect(linkPokemons).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a Página Inicial ', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByText('Home');
    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });
  it('Teste se a aplicação é redirecionada para a página de About', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByText('About');
    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });
  it('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const linkPokemons = screen.getByText('Favorite Pokémons');
    userEvent.click(linkPokemons);
    expect(history.location.pathname).toBe('/favorites');
  });
  it('Teste se a aplicação é redirecionada para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/not-found');
    expect(screen.getByText('Page requested not found')).toBeInTheDocument();
  });
});
