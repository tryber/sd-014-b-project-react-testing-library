import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Teste 3 - FavoritePokemons.js', () => {
  it(`Teste se é exibido na tela a mensagem No favorite pokemon found,
  se a pessoa não tiver pokémons favoritos`, () => {
    renderWithRouter(<FavoritePokemons />);
    const message = screen.getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);
    const details = 'More details';
    const favoritePage = 'Favorite Pokémons';
    const favorite = 'Pokémon favoritado?';
    const home = 'Home';

    fireEvent.click(screen.getByText('Dragon'));
    fireEvent.click(screen.getByText(details));
    fireEvent.click(screen.getByText(favorite));
    fireEvent.click(screen.getByText(home));

    fireEvent.click(screen.getByText('Bug'));
    fireEvent.click(screen.getByText(details));
    fireEvent.click(screen.getByText(favorite));
    fireEvent.click(screen.getByText(home));

    fireEvent.click(screen.getByText(favoritePage));
    const pokemonsFavorites = screen.getAllByText(/More details/i);

    expect(pokemonsFavorites).toHaveLength(2);
  });
});
