import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testando o Favorite Pokémons', () => {
  test('Testa se é exibido na tela a mensagem No Favorites pokemon found', () => {
    render(<FavoritePokemons />);
    const noFavorite = screen.getByText('No favorite pokemon found');
    expect(noFavorite).toBeInTheDocument();
  });

  test('Testa se são exibidos todos os cards pokémon favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', {
      name: 'More details',
    });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);
    expect(moreDetailsLink).not.toBeInTheDocument();
    const favoriteForm = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteForm).toBeInTheDocument();
    userEvent.click(favoriteForm);
    expect(favoriteForm).toBeChecked();
    history.push('/favorites');
    const detailsLink = screen.getByRole('link', {
      name: 'More details',
    });
    expect(detailsLink).toBeInTheDocument();
  });
});

// Acessa o item
// Interage, se houver necessidade
// Faz o teste
