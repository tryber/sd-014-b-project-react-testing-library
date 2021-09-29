import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  const favoritesUrl = '/favorites';
  test(`Teste se é exibido na tela a mensagem No favorite pokemon found,
   se a pessoa não tiver pokémons favoritos.`,
  () => {
    const { history } = renderWithRouter(<App />);
    history.push(favoritesUrl);

    const titleFavorites = screen.getByText('No favorite pokemon found');
    expect(titleFavorites).toBeInTheDocument();

    history.push('/');
    const titleHome = screen.getByText('Encountered pokémons');
    expect(titleHome).toBeInTheDocument();
  });
  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    history.push(favoritesUrl);
    const titleFavorites = screen.getByText('No favorite pokemon found');
    expect(titleFavorites).toBeInTheDocument();

    history.push('/');
    const titleHome = screen.getByText('Encountered pokémons');
    expect(titleHome).toBeInTheDocument();
    const buttonNextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(buttonNextPokemon).toBeInTheDocument();
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    const checkboxFavorite = screen.getByRole('checkbox',
      { name: 'Pokémon favoritado?' });
    expect(checkboxFavorite).toBeInTheDocument();
    userEvent.click(checkboxFavorite);

    history.push(favoritesUrl);
    const favoriteText = screen.getByText('Pikachu');
    expect(favoriteText).toBeInTheDocument();
  });
});
