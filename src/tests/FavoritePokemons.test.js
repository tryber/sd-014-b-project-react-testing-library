import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Testes do componente FavoritePokemons', () => {
  it(`a mensagem No favorite pokemon found,
   se a pessoa não tiver pokémons favoritos`, () => {
    renderWithRouter(<FavoritePokemons />);
    const title = screen.getByText('No favorite pokemon found');
    expect(title).toBeInTheDocument();
  });
  it('Se os cards dos pokemon favoritados são exibidos na tela', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(detailsLink);

    const favoriteCheckBox = screen.getByRole('checkbox');
    userEvent.click(favoriteCheckBox);

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteLink);

    const favoritePokemon = screen.getByText('Pikachu');
    expect(favoritePokemon).toBeInTheDocument();
  });
});
