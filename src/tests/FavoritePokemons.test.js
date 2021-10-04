import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Teste o componente FavoritePokemon.js', () => {
  it('Verifica se é exibido na tela a mensagem: "No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavorites = screen.getByText('No favorite pokemon found');
    expect(noFavorites).toBeInTheDocument();
  });

  it('Verifica se todos os pokemons favoritos são exibidos na tela', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/23');
    const ekkansCheck = screen.getByRole('checkbox');
    expect(ekkansCheck).toBeInTheDocument();
    userEvent.click(ekkansCheck);
    expect(ekkansCheck).toBeChecked();
    history.push('/pokemons/143');
    const snorlaxCheck = screen.getByRole('checkbox');
    expect(snorlaxCheck).toBeInTheDocument();
    userEvent.click(snorlaxCheck);
    expect(snorlaxCheck).toBeChecked();
    userEvent.click(screen.getByRole('link', {
      name: 'Favorite Pokémons',
    }));
    // const favoriteEkans = screen.getByAltText('Ekans is marked as favorite');
    // const favoriteSnorlax = screen.getByAltText('Snorlax is marked as favorite');
    // expect(favoriteEkans).toBeInTheDocument();
    // expect(favoriteSnorlax).toBeInTheDocument();
    const stars = screen.getAllByAltText('is marked as favorite', { exact: false });
    expect(stars).toHaveLength(2);
  });
});
