import React from 'react';
import { screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o componente <App.js />', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });
    const about = screen.getByRole('link', { name: 'About' });
    const favoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(home).toBeDefined();
    expect(about).toBeDefined();
    expect(favoritePokemons).toBeDefined();
  });

  it('Ao clicar no link "Home" a aplicação é redirecionada para a página inicial', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });

    fireEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });
  it('Ao clicar no link "About" a aplicação é redirecionada para URL /about', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: 'About' });

    fireEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  });
  it('Ao clicar no link "FavoritePokémons"  é redirecionado para URL /favorites ', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });

    fireEvent.click(favoritePokemons);
    expect(history.location.pathname).toBe('/favorites');
  });
  it('Ao entrar em URL desconhecida é redirecionado para página "Not Found"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/not-found');
    const pageNotFound = screen.getByText('Page requested not found');
    expect(pageNotFound).toBeDefined();
  });
});
