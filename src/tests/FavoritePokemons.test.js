import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa componente FavoritePokemons', () => {
  test(
    'se a mensagem `No favorite pokemon found` se a pessoa não tiver pokémons favoritos.',
    () => {
      renderWithRouter(<FavoritePokemons />);

      const favoriteMessage = screen.getByText('No favorite pokemon found');
      expect(favoriteMessage).toBeInTheDocument();
    },
  );
});
