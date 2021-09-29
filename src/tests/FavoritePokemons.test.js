import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testa o componente <FavoritePokemons.js />', () => {
  test(`É exibido na tela a mensagem "No favorite pokemon found", 
  se a pessoa não tiver pokémons favoritos`, () => {
    renderWithRouter(<FavoritePokemons />);
    const alert = screen.getByText(/No favorite pokemon found/);
    expect(alert).toBeInTheDocument();
  });

  test('É exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const buttonDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(buttonDetails);

    const favoriteInput = screen.getByRole('checkbox');
    userEvent.click(favoriteInput);

    const favPokemonsLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favPokemonsLink);

    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toBeInTheDocument();
  });
});
