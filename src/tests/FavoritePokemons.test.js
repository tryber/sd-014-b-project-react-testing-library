import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../RenderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('se exibe No favorite pokemon found, se não tiver pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFav = screen.getByText(/No favorite pokemon found/i);
    expect(noFav).toBeInTheDocument();
  });
  test('se é exibido todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', {
      name: 'More details',
    });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);
    expect(moreDetailsLink).not.toBeInTheDocument();
    const checkFavorite = screen.getByLabelText('Pokémon favoritado?');
    expect(checkFavorite).toBeInTheDocument();
    userEvent.click(checkFavorite);
    expect(checkFavorite).toBeChecked();
    history.push('/favorites');
    const textFavorite = screen.getByText(/average/i);
    expect(textFavorite).toBeInTheDocument();
  });
});
