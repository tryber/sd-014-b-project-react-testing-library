import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Requisito 3 - Teste o componente FavoritePokemons', () => {
  test('se é exibido na tela a mensagem ` No favorite pokemon found`', () => {
    renderWithRouter(<FavoritePokemons />);

    const notFound = screen.getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });
});
