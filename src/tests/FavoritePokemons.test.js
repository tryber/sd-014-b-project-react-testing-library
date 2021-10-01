import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Teste o componente FavoritePokemons', () => {
  it('mensagem de "No favorite pokemon found", se não houver pokémons favoritos', () => {
    render(<FavoritePokemons />);

    const notFoudmensage = screen.getByText('No favorite pokemon found');
    expect(notFoudmensage).toBeInTheDocument();
  });
  it('são exibidos os cards dos pokémons favoritados', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const MoreDetailsLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(MoreDetailsLink);

    const favorite = screen.getByRole('checkbox');
    userEvent.click(favorite);

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteLink);

    const pokemon = screen.getByText(/Pikachu/i);
    expect(pokemon).toBeInTheDocument();
  });
});
