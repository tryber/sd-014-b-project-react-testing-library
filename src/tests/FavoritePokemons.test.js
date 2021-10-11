import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Se as informações são renderizadas na página Favorite Pokémons', () => {
  test('Se é exibido No favorite pokemon found quando não tem nenhum favorito', () => {
    render(<FavoritePokemons />);

    const noFavoriteText = screen.getByText('No favorite pokemon found');
    expect(noFavoriteText).toBeInTheDocument();
  });

  test('Se são exibidos os cards dos pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: 'More details',
    });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    expect(detailsLink).not.toBeInTheDocument();
    const checkFavorite = screen.getByLabelText('Pokémon favoritado?');
    expect(checkFavorite).toBeInTheDocument();
    userEvent.click(checkFavorite);
    expect(checkFavorite).toBeChecked();
    history.push('/favorites');
    const textFavorite = screen.getByText(/average/i);
    expect(textFavorite).toBeInTheDocument();
  });
});
