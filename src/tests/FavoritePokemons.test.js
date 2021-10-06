import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../uteis/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testa o componente FavoritePokemons', () => {
  test(`se é exibido na tela a mensagem "No favorite pokemon found",
  se a pessoa não tiver pokémons favoritos.`, () => {
    renderWithRouter(<FavoritePokemons />);
    const textNoFavoritePokemons = screen.getByText('No favorite pokemon found');
    expect(textNoFavoritePokemons).toBeInTheDocument();
  });

  test(`se um pokemon aparece em favoritos após marcado a opção 
  "Pokémon favoritado?".`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const checkboxFavorite = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(checkboxFavorite);
    history.push('/favorites');
    const namePokemon = screen.getByText('Pikachu');
    expect(namePokemon).toBeInTheDocument();
  });
});
