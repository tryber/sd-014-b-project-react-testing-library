import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste do componente App', () => {
  it('Testa se existe os links de navegação', () => {
    renderWithRouter(<App />);

    const btnHome = screen.getByRole('link', { name: 'Home' });
    expect(btnHome).toBeInTheDocument();

    const btnAbout = screen.getByRole('link', { name: 'About' });
    expect(btnAbout).toBeInTheDocument();

    const btnFavoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(btnFavoritePokemons).toBeInTheDocument();
  });

  it('Testa se os links de navegação correspondem ao endereço correto', () => {
    const { history } = renderWithRouter(<App />);

    const btnHome = screen.getByRole('link', { name: 'Home' });
    const btnAbout = screen.getByRole('link', { name: 'About' });
    const btnFavoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });

    userEvent.click(btnHome);
    expect(history.location.pathname).toBe('/');

    userEvent.click(btnAbout);
    expect(history.location.pathname).toBe('/about');

    userEvent.click(btnFavoritePokemons);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Testa se existe a PageNotFound', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rotaQualquer');

    const pageNotFound = screen.getByText('Page requested not found');
    expect(pageNotFound).toBeInTheDocument();
  });
});
