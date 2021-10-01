import React from 'react';
import { screen, render } from '@testing-library/react';
import { FavoritePokemons } from '../components';

describe('Teste Favorite Pokemons', () => {
  it('Mensagem de não encontrado', () => {
    render(<FavoritePokemons />);
    const notFound = screen.getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });
});
