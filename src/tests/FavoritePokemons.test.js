import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste do componente Favorite Pokemons', () => {
  it('Testa se existe a pagina notFound', () => {
    renderWithRouter(<FavoritePokemons />);

    const notFound = screen.getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });

  it('Testa se existe um card de Pokemon favorito', () => {
    const { history } = renderWithRouter(<App />);

    const btnDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(btnDetails);

    const checkbox = screen.getByRole('checkbox', { id: 'favorite' });
    userEvent.click(checkbox);

    history.push('/favorites');

    const pokemonCard = screen.getByRole('link', { name: 'More details' });
    expect(pokemonCard).toBeInTheDocument();
  });
});
