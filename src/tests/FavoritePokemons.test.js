import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test(`Teste se é exibido na tela a mensagem No favorite pokemon found,
    se a pessoa não tiver pokémons favoritos`, () => {
    renderWithRouter(<FavoritePokemons />);
    const pokemonFavoriteTitle = screen.getByRole('heading', {
      level: 2,
      name: 'Favorite pokémons',
    });
    expect(pokemonFavoriteTitle).toBeInTheDocument();

    const notPokemonFavorite = screen.getByText('No favorite pokemon found');
    expect(notPokemonFavorite).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const pokemon = [
      {
        averageWeight: {
          value: '6.0',
          measurementUnit: 'kg',
        },
        id: 25,
        image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
        name: 'Pikachu',
        type: 'Electric',
      },
    ];
    renderWithRouter(<FavoritePokemons pokemons={ pokemon } />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const linkDetails = screen.getByRole('link', { name: 'More details' });
    const pokemonImg = screen.getByAltText('Pikachu sprite');

    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(linkDetails).toBeInTheDocument('More details');
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
});
