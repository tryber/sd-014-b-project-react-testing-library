import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('é exibido na tela \'No favorite pokemon found\','
  + 'se a pessoa não tiver pokémons favoritos.', () => {
    render(<FavoritePokemons />);

    const heading = screen.getByRole('heading', { level: 2, name: 'Favorite pokémons' });
    expect(heading).toBeInTheDocument();

    const notFound = screen.getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });
});
