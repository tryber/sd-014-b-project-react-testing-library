import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente App', () => {
  it('se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const home = screen.getByText('Home');
    const about = screen.getByText('About');
    const favorites = screen.getByText('Favorite Pokémons');
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorites).toBeInTheDocument();
  });

  it(`se a aplicação é redirecionada para a página inicial,
  na URL / ao clicar no link Home da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByText('Home');
    userEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it(`se a aplicação é redirecionada para a página de About,
  na URL /about, ao clicar no link About da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByText('About');
    userEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it(`se a aplicação é redirecionada para a página de Pokémons Favoritados,
  na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const favorites = screen.getByText('Favorite Pokémons');
    userEvent.click(favorites);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it(`se a aplicação é redirecionada para a página Not Found
  ao entrar em uma URL desconhecida.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const noMatch = screen.getByText('Page requested not found');
    expect(noMatch).toBeInTheDocument();
  });
});
