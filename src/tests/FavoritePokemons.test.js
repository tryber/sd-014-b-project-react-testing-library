import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Requisito 3', () => {
  test('Verifica se possui o texto caso não tenha conteúdo', () => {
    render(<FavoritePokemons />);
    const contentP = screen.getByText('No favorite pokemon found');
    expect(contentP).toBeInTheDocument();
  });

  test('Verifica se mostra os cards dos pokemons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const buttonDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(buttonDetails);

    const checkboxFavorited = screen.getByRole('checkbox', { id: 'favorite' });
    userEvent.click(checkboxFavorited);

    history.push('/favorites');

    const favoritedPokemon = screen.getByText(/Average weight:/i);
    expect(favoritedPokemon).toBeInTheDocument();
  });
});
