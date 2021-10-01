import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('3 - Testa o componente FavoritePokemons.js', () => {
  test('Verifica se é exibido No favorite pokemon found,se não houver favoritos', () => {
    renderWithRouter(<FavoritePokemons />);

    const elementNoFavorite = screen.getByText(/No favorite pokemon found/i);
    expect(elementNoFavorite).toBeInTheDocument();
  });

  test('Verifica se é exibido na tela todos os cards de pokémons favoritados', () => {
    const favorites = [
      pokemons[0],
      pokemons[1],
      pokemons[2],
      pokemons[3],
      pokemons[4],
      pokemons[5],
      pokemons[6],
      pokemons[7],
      pokemons[8],
    ];

    renderWithRouter(<FavoritePokemons pokemons={ favorites } />);
    const cardPikachu = screen.getByText(/Pikachu/i);
    expect(cardPikachu).toBeInTheDocument();
    const cardCharmander = screen.getByText(/Charmander/i);
    expect(cardCharmander).toBeInTheDocument();
    const cardCaterpie = screen.getByText(/Caterpie/i);
    expect(cardCaterpie).toBeInTheDocument();
    const cardEkans = screen.getByText(/Ekans/i);
    expect(cardEkans).toBeInTheDocument();
    const cardAlakazam = screen.getByText(/Alakazam/i);
    expect(cardAlakazam).toBeInTheDocument();
    const cardMew = screen.getByText(/Mew/i);
    expect(cardMew).toBeInTheDocument();
    const cardRapidash = screen.getByText(/Rapidash/i);
    expect(cardRapidash).toBeInTheDocument();
    const cardSnorlax = screen.getByText(/Snorlax/i);
    expect(cardSnorlax).toBeInTheDocument();
    const cardDragonair = screen.getByText(/Dragonair/i);
    expect(cardDragonair).toBeInTheDocument();
  });
});
