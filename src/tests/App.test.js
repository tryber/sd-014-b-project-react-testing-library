import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa se no componente App', () => {
  it('Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByText(/About/i);
    const favoriteLink = screen.getByText(/Favorite Pokémons/i);

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  it('Testa o direcionamento para a rota "/"', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByText(/Home/i);

    userEvent.click(home);

    expect(history.location.pathname).toBe('/');
  });

  it('Testa o direcionamento para a rota "/favorites"', () => {
    const { history } = renderWithRouter(<App />);
    const favorites = screen.getByText(/Favorite/i);

    userEvent.click(favorites);

    expect(history.location.pathname).toBe('/favorites');
  });

  it('Testa o direcionamento para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/naoencontrada');

    const notFound = screen.getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});

// Referência para o teste da Page Not Found: https://github.com/tryber/sd-014-b-project-react-testing-library/pull/29/files
