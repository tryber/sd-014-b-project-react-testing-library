import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Requisito 1: Teste o componente <App.js />', () => {
  test('Teste se na aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const home = screen.getByText('Home');
    const about = screen.getByText('About');
    const favPokemons = screen.getByText('Favorite Pokémons');
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favPokemons).toBeInTheDocument();
  });

  test(`Teste se a aplicação é redirecionada 
  para a página inicial, na URL / ao clicar no link Home`, () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByText('Home');
    userEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test(`Teste se a aplicação é redirecionada 
  para a página de About, na URL /about`, () => {
    const { history } = renderWithRouter(<App />);
    const About = screen.getByText('About');
    userEvent.click(About);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test(`Teste se a aplicação é redirecionada 
  para Pokémons Favoritados, na URL /favorites`, () => {
    const { history } = renderWithRouter(<App />);
    const favPokemons = screen.getByText('Favorite Pokémons');
    userEvent.click(favPokemons);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test(`Teste se a aplicação é redirecionada 
  para Pokémons Favoritados, na URL /favorites`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('Texto qualquer');
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
// mec.
