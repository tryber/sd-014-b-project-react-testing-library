import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testa o componente app', () => {
  test('se existe um conjunto de links na naveção', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: 'Home' });
    expect(linkHome).toBeInTheDocument();

    const linkAbout = screen.getByRole('link', { name: 'About' });
    expect(linkAbout).toBeInTheDocument();

    const linkFavoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkFavoritePokemons).toBeInTheDocument();
  });

  test('se clicando no link Home na navegação, será redirecionado para a "Url" /', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHome);

    const titleHome = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons' });

    expect(titleHome).toBeInTheDocument();

    expect(history.location.pathname).toBe('/');
  });

  test('se clicar no link About na navegação, renderiza o componente About', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);

    const titleAbout = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex' });

    expect(titleAbout).toBeInTheDocument();

    expect(history.location.pathname).toBe('/about');
  });

  test('se clicar no link favorite Pokemons renderiza  o componente favorite Pokemons',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkFavoritePokemon = screen.getByRole('link', { name: 'Favorite Pokémons' });
      userEvent.click(linkFavoritePokemon);

      const titleFavoritePokemons = screen.getByRole('heading', {
        level: 2,
        name: 'Favorite pokémons' });

      expect(titleFavoritePokemons).toBeInTheDocument();

      expect(history.location.pathname).toBe('/favorites');
    });

  test('se entrar em uma URL desconhecida renderiza o componente Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rota-desconhecida');

    const textNotFound = screen.getByText('Page requested not found');

    expect(textNotFound).toBeInTheDocument();
  });
});
