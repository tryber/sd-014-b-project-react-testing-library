import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './renderWithRouter';

import App from '../App';

describe('Testa a funcionalidade do componente App', () => {
  it('links de navegação', () => {
    renderWithRouter(<App />);

    const home = screen.getByText('Home');
    expect(home).toBeInTheDocument();

    const about = screen.getByText('About');
    expect(about).toBeInTheDocument();

    const faviritePokemons = screen.getByText('Favorite Pokémons');
    expect(faviritePokemons).toBeInTheDocument();
  });

  it('redireciona para página inicial ao clicar em "Home"', () => {
    const { history } = renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: 'Home' });
    expect(home).toBeInTheDocument();

    userEvent.click(home);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('redireciona para página about ao clicar em "About"', () => {
    const { history } = renderWithRouter(<App />);

    const about = screen.getByRole('link', { name: 'About' });
    expect(about).toBeInTheDocument();

    userEvent.click(about);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('clicar em "favorite pokémons" redireciona à página de mesmo nome', () => {
    const { history } = renderWithRouter(<App />);

    const favorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favorite).toBeInTheDocument();

    userEvent.click(favorite);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('redirecionamento para página "Not Found" caso a URL seja desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pag/not-found');

    const notFound = screen.getByRole('heading', { level: 2 });
    expect(notFound).toBeInTheDocument();
  });
});
