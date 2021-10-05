import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import App from '../App';

describe('Testa o componente App.js', () => {
  test('se o topo da aplicação contém um conjunto fixo de links de navegação.', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const favPokemonsLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favPokemonsLink).toBeInTheDocument();
  });

  test('se ao clicar em home vai para página inicial', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);

    expect(history.location.pathname).toBe('/');
  });

  test('se ao clicar em about vai para página sobre', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);

    expect(history.location.pathname).toBe('/about');
  });

  test('se ao clicar em Favorite Pokemons vai para página de favoritos', () => {
    const { history } = renderWithRouter(<App />);

    const favPokemonsLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favPokemonsLink);

    expect(history.location.pathname).toBe('/favorites');
  });

  test('se ao ir para uma URL desconhecida exibe a página Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rota-maraviliosa-que-por-algum-motivo-desconhecido-não-existe');

    const notFoundImage = screen
      .getByAltText('Pikachu crying because the page requested was not found');

    expect(notFoundImage).toBeInTheDocument();
  });
});
