import React from 'react';
import { screen, render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Se é exibido na tela a mensagem `No favorite pokemon found`.', () => {
    render(<FavoritePokemons />);

    const notHaveFavorites = screen.getByText('No favorite pokemon found');
    expect(notHaveFavorites).toBeInTheDocument();
  });

  test('Se é exibido todos os cards de pokémons favoritados.`.', () => {
    const quantityOfFavoritedPokemons = 5;
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    for (let i = 0; i < quantityOfFavoritedPokemons; i += 1) {
      for (let j = i; j > 0; j -= 1) {
        const linkNextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
        userEvent.click(linkNextPokemon);
      }

      const linkMoreDetails = screen.getByRole('link', { name: 'More details' });
      userEvent.click(linkMoreDetails);
      const linkFavoritedPokemon = screen
        .getByRole('checkbox', { name: 'Pokémon favoritado?' });
      userEvent.click(linkFavoritedPokemon);
      const linkHome = screen.getByRole('link', { name: 'Home' });
      userEvent.click(linkHome);
    }

    const linkFavoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavoritePokemons);

    const favoritePokemons = screen.getAllByText(/More details/i);
    expect(favoritePokemons).toHaveLength(quantityOfFavoritedPokemons);
  });
});
