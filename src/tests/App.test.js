// Referência, PR do Rafael Veiga
// src: https://github.com/tryber/sd-014-b-project-react-testing-library/pull/30/files

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testa o componente <App.js />', () => {
  it(`Testa se o topo da aplicação
  contém um conjunto fixo de links de navegação.`, () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent('Home');
    expect(links[1]).toHaveTextContent('About');
    expect(links[2]).toHaveTextContent('Favorite Pokémons');
  });

  // src, alt: https://stackoverflow.com/a/51334009
  it(`Testa se a aplicação é redirecionada para a página inicial,
  na URL / ao clicar no link Home da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    userEvent.click(links[0]);
    expect(history.location.pathname).toBe('/');
  });

  it(`Testa se a aplicação é redirecionada para a página de About,
  na URL /about, ao clicar no link About da barrade navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    userEvent.click(links[1]);
    expect(history.location.pathname).toBe('/about');
  });

  it(`Testa se a aplicação é redirecionada para a página de Pokémons Favoritados,
  na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    userEvent.click(links[2]);
    expect(history.location.pathname).toBe('/favorites');
  });

  it(`Testa se a aplicação é redirecionada para a página
  Not Found ao entrar em uma URL desconhecida.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('lorem-ipsum');
    const page = screen.getByText(/requested not found/);
    expect(page).toBeInTheDocument();
  });
});
