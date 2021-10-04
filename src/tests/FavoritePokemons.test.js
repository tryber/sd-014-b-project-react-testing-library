import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../../helper/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testa o componente FavoritePokemons.js', () => {
  test(`Teste se é exibido na tela a mensagem No favorite pokemon found,
   se a pessoa não tiver pokémons favoritos.`, () => {
    renderWithRouter(<FavoritePokemons />);

    const text = screen.getByText('No favorite pokemon found');
    expect(text).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByText('More details');
    fireEvent.click(detailsLink);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);

    const favoritePokemonsLink = screen.getByText('Favorite Pokémons');
    fireEvent.click(favoritePokemonsLink);
    const pokemonDetail = screen.getByText('More details');
    expect(pokemonDetail).toBeInTheDocument();
  });
});
