import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testes requisito 3, teste do component FavoritePokemons', () => {
  test('Testa se é exibido na tela a mensagem No favorite POkemon found', () => {
    render(<FavoritePokemons />);

    const favPokemon = screen.getByRole('heading', {
      level: 2,
      name: 'Favorite pokémons',
    });
    expect(favPokemon).toBeInTheDocument();

    const notFound404 = screen.getByText('No favorite pokemon found');
    expect(notFound404).toBeInTheDocument();
  });
});
