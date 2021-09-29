import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import { pokemonsFavorites } from './helpers/dataTest';
import App from '../App';
import { FavoritePokemons } from '../components';
import userEvent from '@testing-library/user-event';

describe('3 - Teste o componente FavoritePokemons', () => {

  it('se é exibido na tela a mensagem "No favorite pokemon found", se a pessoa não tiver pokémons favoritos', () => {
    render(<FavoritePokemons />)

    const title = screen.getByRole('heading', {level: 2, name: 'Favorite pokémons'});
    expect(title).toBeInTheDocument();

    const NotFoundPokemon = screen.getByText('No favorite pokemon found');
    expect(NotFoundPokemon).toBeInTheDocument();

  });

  it('se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: 'More details'})
    userEvent.click(linkDetails);

    const checkboxFavorite = screen.getByRole('checkbox');
    userEvent.click(checkboxFavorite);

    const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémons'});
    userEvent.click(linkFavorite);

    const pokemon = screen.getByText(/Pikachu/i);
    expect(pokemon).toBeInTheDocument();
  });

});
