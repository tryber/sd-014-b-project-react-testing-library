import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste o componente FavoritePokemons', () => {
  it('mensagem de "No favorite pokemon found", se não houver pokémons favoritos', () => {
    render(<FavoritePokemons />);

    const notFoudmensage = screen.getByText('No favorite pokemon found');
    expect(notFoudmensage).toBeInTheDocument();
  });
});
