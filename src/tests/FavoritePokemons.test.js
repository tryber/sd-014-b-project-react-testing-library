import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente Favoritepokemons', () => {
  test('se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFoundPokemon = screen.getByText(/No favorite pokemon found/i);
    expect(notFoundPokemon).toBeInTheDocument();
  });

  test('se é exibido todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const LinkDetails = screen.getByRole('link', { name: 'More details' });
    expect(LinkDetails).toBeInTheDocument();
    userEvent.click(LinkDetails);
    const url = history.location.pathname;
    expect(url).toBe('/pokemons/25');
    const checkFavorite = screen.getByRole('checkbox');
    expect(checkFavorite).not.toBeChecked();
    userEvent.click(checkFavorite);
    expect(checkFavorite).toBeChecked();
    const linkFavorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavorites);
    const urlFavorites = history.location.pathname;
    expect(urlFavorites).toBe('/favorites');
    const namePokemon = screen.getByTestId('pokemon-name');
    const typePokemon = screen.getByTestId('pokemon-type');
    expect(namePokemon).toBeInTheDocument();
    expect(namePokemon).toHaveTextContent('Pikachu');
    expect(typePokemon).toBeInTheDocument();
    expect(typePokemon).toHaveTextContent('Electric');
  });
});
