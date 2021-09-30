import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('3 - Teste o componente <FavoritePokemons.js />', () => {
  test(`Teste se é exibido na tela a mensagem No favorite pokemon found, se
  a pessoa não tiver pokémons favoritos`, () => {
    renderWithRouter(<FavoritePokemons />);
    const title = screen.getByRole('heading', { level: 2, name: 'Favorite pokémons' });
    expect(title).toBeInTheDocument();
    const paragraph = screen.getByText('No favorite pokemon found');
    expect(paragraph).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkDetails);
    const pokemonDetails = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(pokemonDetails);
    const linkFavorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavorites);
    const favoritePokemon = screen.getByText(/Pikachu/i);
    expect(favoritePokemon).toBeInTheDocument();
  });
});
