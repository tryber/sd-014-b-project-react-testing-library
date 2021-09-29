import React from 'react';
import { screen, render } from '@testing-library/react';
import { FavoritePokemons } from '../components';

describe('3 - Testa o componente FavoritePokemons.js', () => {
  it('Verifica mensagem de não encontrado caso não haja pokemóns favoritos', () => {
    render(<FavoritePokemons />);
    const notFound = screen.getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });
  it('Verifica a exibição de pokemóns caso tenham sido favoritados', () => {
    render(<FavoritePokemons />);
  });
});
