import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../../helper/renderWithRouter';
import App from '../App';

describe('Testa o componente app.js', () => {
  it('Testa se o topo da aplicação contém um conjunto de links', () => {
    renderWithRouter(<App />);

    const home = screen.getByText('Home');
    expect(home).toBeInTheDocument();

    const about = screen.getByText('About');
    expect(about).toBeInTheDocument();

    const favoritePokemons = screen.getByText('Favorite Pokémons');
    expect(favoritePokemons).toBeInTheDocument();
  });

  it(`Teste se a aplicação é redirecionada para a página inicial,
   na URL / ao clicar no link Home`, () => {
    const { history } = renderWithRouter(<App />);

    const home = screen.getByText('Home');
    expect(home).toBeInTheDocument();

    fireEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it(`Testa se a aplicação é redirecionada para a página de About,
   na URL /about, ao clicar no link About`, () => {
    const { history } = renderWithRouter(<App />);

    const about = screen.getByText('About');
    expect(about).toBeInTheDocument();
    fireEvent.click(about);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it(`Testa se a aplicação é redirecionada para a página de Pokémons Favoritados,
   na URL /favorites, ao clicar no link Favorite Pokémons `, () => {
    const { history } = renderWithRouter(<App />);

    const favoritePokemons = screen.getByText('Favorite Pokémons');
    expect(favoritePokemons).toBeInTheDocument();

    fireEvent.click(favoritePokemons);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it(`Teste se a aplicação é redirecionada para a
   página Not Found ao entrar em uma URL desconhecida.`, () => {
    const { history } = renderWithRouter(<App />);

    history.push('/adsfofgdas');

    const error = screen.getByText('Page requested not found');
    expect(error).toBeInTheDocument();
  });
});
