import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import React from 'react';
import App from '../App';

describe('Existe o conjunto de links', () => {
  it('que leva para rota "Home"', () => {
    render(
      <Router history={ createMemoryHistory() }>
        <App />
      </Router>,
    );
    const home = screen.getByRole('link', { name: 'Home' });

    expect(home).toBeInTheDocument();
  });

  it('que leva para rota "About"', () => {
    render(
      <Router history={ createMemoryHistory() }>
        <App />
      </Router>,
    );
    const about = screen.getByRole('link', { name: 'About' });

    expect(about).toBeInTheDocument();
  });

  it('que leva para rota "Favorite Pokémons"', () => {
    render(
      <Router history={ createMemoryHistory() }>
        <App />
      </Router>,
    );
    const favorite = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(favorite).toBeInTheDocument();
  });
});

describe('Ao clickar no link "Home"', () => {
  it('é redirecionado para a página inicial', () => {
    const historico = createMemoryHistory();
    render(
      <Router history={ historico }>
        <App />
      </Router>,
    );
    const home = screen.getByRole('link', { name: 'Home' });

    userEvent.click(home);

    expect(historico.location.pathname).toBe('/');
  });
});

describe('Ao clickar no link "About"', () => {
  it('é redirecionado para a página "sobre"', () => {
    const historico = createMemoryHistory();
    render(
      <Router history={ historico }>
        <App />
      </Router>,
    );
    const about = screen.getByRole('link', { name: 'About' });

    userEvent.click(about);

    expect(historico.location.pathname).toBe('/about');
  });
});

describe('Ao clickar no link "Favorite Pokémons"', () => {
  it('é redirecionado para a página de pokemons favoritos', () => {
    const historico = createMemoryHistory();
    render(
      <Router history={ historico }>
        <App />
      </Router>,
    );

    const favorites = screen.getByRole('link', { name: 'Favorite Pokémons' });

    userEvent.click(favorites);

    expect(historico.location.pathname).toBe('/favorites');
  });
});
