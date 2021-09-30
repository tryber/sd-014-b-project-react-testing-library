import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('FavoritePokemons.js tests set', () => {
  it('should appears in the screen the message No favorite pokemon', () => {
    // Teste se é exibido na tela a mensagem No favorite pokemon found, se a pessoa não tiver pokémons favoritos.
    render(
      <MemoryRouter>
        <FavoritePokemons />
      </MemoryRouter>,
    );

    const textFavorite = screen.getByRole('heading', {
      level: 2, name: /favorite pokémons/i });
    const paragraphNoFavFound = screen.getByText(/no favorite pokemon found/i);
    expect(textFavorite).toBeInTheDocument();
    expect(paragraphNoFavFound).toBeInTheDocument();
  });

  it('should appears ir the screen the favorited pokemon', () => {
    // Teste se é exibido todos os cards de pokémons favoritados.
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);
    const checkboxPokemon = screen.getByRole('checkbox', { checked: false });
    userEvent.click(checkboxPokemon);
    const linkFavorite = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(linkFavorite);
    const imgPokemon = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(imgPokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
});
