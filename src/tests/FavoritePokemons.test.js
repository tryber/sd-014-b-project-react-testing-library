import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente FavoritePokemons', () => {
  it('se é exibido na tela a mensagem No favorite pokemon found, '
  + 'se a pessoa não tiver pokémons favoritos.', () => {
    renderWithRouter(<App />);
    const favorites = screen.getByText('Favorite Pokémons');
    userEvent.click(favorites);
    const noFavoriteText = screen.getByText('No favorite pokemon found');
    expect(noFavoriteText).toBeInTheDocument();
  });
  it('se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText('More details');
    userEvent.click(moreDetails);
    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);
    const favorites = screen.getByText('Favorite Pokémons');
    userEvent.click(favorites);
    const favIcon = screen.getAllByRole('img', { src: 'star-icon.svg' });
    expect(favIcon.length).toBeGreaterThan(0);
  });
});
