import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('3 - Testa o componente FavoritePokemons.js', () => {
  it('Verifica mensagem de não encontrado caso não haja pokemóns favoritos', () => {
    render(<FavoritePokemons />);
    const notFound = screen.getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });
  it('Verifica a exibição de pokemóns caso tenham sido favoritados', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);

    const favoritePokemonCheck = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    userEvent.click(favoritePokemonCheck);

    const favoritePokemonsLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoritePokemonsLink);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
  });
});
