import React from 'react';
import { render, screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';

describe('testa o componente FavoritePokemons', () => {
  test('se é exibido a mensagem No favorite pokemon found', () => {
    render(<FavoritePokemons />);
    const noFavotirePokemon = screen.getByText('No favorite pokemon found');
    expect(noFavotirePokemon).toBeInTheDocument();
  });
});
