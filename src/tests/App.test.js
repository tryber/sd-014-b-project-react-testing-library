import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

describe('Testa o componenete App', () => {
  it('se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const home = screen.getByText('Home');
    expect(home).toBeInTheDocument();

    const about = screen.getByText('About');
    expect(about).toBeInTheDocument();

    const favorite = screen.getByText('Favorite Pokémons');
    expect(favorite).toBeInTheDocument();
  });

  it(`se a aplicação é redirecionada para a página inicial,
   na URL / ao clicar no link Home da barra de navegação`, () => {
    const { history } = renderWithRouter(<App />);

    const home = screen.getByText('Home');
    expect(home).toBeInTheDocument();

    fireEvent.click(home);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/');
  });

  it(`Teste se a aplicação é redirecionada para a página de
  About, na URL /about, ao clicar no link About da barra de navegação`, () => {
    const { history } = renderWithRouter(<App />);

    const about = screen.getByText('About');
    expect(about).toBeInTheDocument();

    fireEvent.click(about);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/about');
  });

  it(`Teste se a aplicação é redirecionada para a página de Pokémons Favoritados,
  na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação`, () => {
    const { history } = renderWithRouter(<App />);

    const favorites = screen.getByText('Favorites Pokémons');
    expect(favorites).toBeInTheDocument();

    fireEvent.click(favorites);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/favorites');
  });

  it(`Teste se a aplicação é redirecionada para a página Not
  Found ao entrar em uma URL desconhecida`, () => {
    const { history } = renderWithRouter(<App />);

    history.push('/página_inexistente');

    const notFound = screen.getByText('Page requested not found 😭');
    expect(notFound).toBeInTheDocument();
  });
});
