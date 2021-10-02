import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Testa o componente <FavoritePokemons.js />', () => {
  test('Se a mensagem "No favorite pokemon found" é exibida na tela', () => {
    renderWithRouter(<FavoritePokemons />);

    const paragraph = screen.getByText(/No favorite pokemon found/);
    expect(paragraph).toBeInTheDocument();
  });

  test('Se o card do pokemon favoritado aparece na tela', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pokemons/25');
    const checkboxFavorite = screen.getByRole('checkbox');
    fireEvent.click(checkboxFavorite);
    history.push('/favorites');
    const pokemon = screen.getByText(/Pikachu/i);
    expect(pokemon).toBeInTheDocument();
  });
});
