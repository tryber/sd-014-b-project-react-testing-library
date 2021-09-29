import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testa conteúdo da página de Favoritos', () => {
  test('se há mensagem de que não existe pokemons favoritados quando não tiver nenhum',
    () => {
      renderWithRouter(<FavoritePokemons />);
      const noHaveFavorites = screen.getByText(/No favorite pokemon found/);
      expect(noHaveFavorites).toBeInTheDocument();
    });

  test('se os cards dos favoritados são exibidos', () => {
    renderWithRouter(<App />);

    // Simulação do uso da aplicação, para verificar a ida do pokemon para página de favoritos

    // Dentro da página Home - com todos os pokemons
    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkMoreDetails);

    // Dentro do moreDetails do pokemon selecionado, verificando o checkbox para favoritar o pokemon
    const inputFavorite = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(inputFavorite);

    // Entrando no link de Favorites
    const linkFav = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFav);

    // Verificando a existência de pokemons na página pelo data-testid
    const pokemonFav = screen.getByTestId('pokemon-name');
    expect(pokemonFav).toBeInTheDocument();
  });
});
