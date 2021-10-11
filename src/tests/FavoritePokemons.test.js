import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Req 3 - Testa o componente "FavoritePokemons"', () => {
  it('Deve ser exibido a mensagem "No favorite pokemon found"'
  + 'se a pessoa não tiver pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);

    const notFavoritesMessage = screen.getByText('No favorite pokemon found');
    expect(notFavoritesMessage).toBeInTheDocument();
  });

  // ref: https://github.com/tryber/sd-014-b-project-react-testing-library/pull/72/files
  it('Deve exibir todos os cards de pokémons favoritados ', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', {
      name: 'More details',
    }));
    userEvent.click(screen.getByRole('checkbox'));
    userEvent.click(screen.getByRole('link', {
      name: 'Favorite Pokémons',
    }));

    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toBeInTheDocument();
  });
});
