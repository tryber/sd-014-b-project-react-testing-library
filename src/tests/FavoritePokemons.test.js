import React from 'react';
import { render, screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';

describe('3 - Teste o componente FavoritePokemons', () => {
  it(`se é exibido na tela a mensagem "No favorite pokemon found",
     se a pessoa não tiver pokémons favoritos`, () => {
    render(<FavoritePokemons />);

    const title = screen.getByRole('heading', { level: 2, name: 'Favorite pokémons' });
    expect(title).toBeInTheDocument();

    const NotFoundPokemon = screen.getByText('No favorite pokemon found');
    expect(NotFoundPokemon).toBeInTheDocument();
  });
});
