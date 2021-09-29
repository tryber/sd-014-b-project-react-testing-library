import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente FavoritePokemons', () => {
  test(
    'deve conter a mensagem No favorite pokemon found, se não tiver pokémons favoritos.',
    () => {
      renderWithRouter(<FavoritePokemons />);

      const message = screen.getByText('No favorite pokemon found');
      expect(message).toBeInTheDocument();
    },
  );

  test('deve exibir pokemons favoritados', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByText('More details');
    fireEvent.click(moreDetails);

    const favoriteBtn = screen.getByLabelText('Pokémon favoritado?');
    fireEvent.click(favoriteBtn);

    const homeBtn = screen.getByRole('link', { name: 'Home' });
    fireEvent.click(homeBtn);

    const favoritePokemonsBtn = screen.getByRole('link', { name: 'Favorite Pokémons' });
    fireEvent.click(favoritePokemonsBtn);

    const pokemonName = screen.getByText('Pikachu');
    expect(pokemonName).toBeInTheDocument();
  });
});
