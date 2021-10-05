import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente <FavoritePokemons.js />', () => {
  it('Verifica se é exibido na tela a mensagem "No favorite pokemon found"', () => {
    renderWithRouter(<App />);

    const linkToFavPokemons = screen.getByText('Favorite Pokémons');
    userEvent.click(linkToFavPokemons);

    const withoutFavoritePokemons = screen.getByText('No favorite pokemon found');
    expect(withoutFavoritePokemons).toBeInTheDocument();
  });

  it('Verifica se há algum Pokemon favoritado', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByText('More details');
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const favoritePokemonLabel = screen.getByText('Pokémon favoritado?');
    expect(favoritePokemonLabel).toBeInTheDocument();
    userEvent.click(favoritePokemonLabel);

    const linkToFavPokemons = screen.getByText('Favorite Pokémons');
    expect(linkToFavPokemons).toBeInTheDocument();
    userEvent.click(linkToFavPokemons);

    const favPokemonName = screen.getByTestId('pokemon-name');
    expect(favPokemonName).toBeInTheDocument();
  });
});
