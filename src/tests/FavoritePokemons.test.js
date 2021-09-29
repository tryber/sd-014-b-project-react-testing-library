import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibido na tela a mensagem "No favorite pokemon found" ', () => {
    render(<FavoritePokemons />);

    const favoriteNotFound = screen.getByText('No favorite pokemon found');
    expect(favoriteNotFound).toBeInTheDocument();
  });
  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);

    const checkbox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(checkbox);

    const favoriteList = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteList);

    const namePokemon = screen.getByText('Pikachu');
    expect(namePokemon).toBeInTheDocument();
  });
});
