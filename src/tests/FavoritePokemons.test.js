import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <FavoritePokemons.js />', () => {
  beforeEach(() => {
    localStorage.setItem('favoritePokemonIds', JSON.stringify([]));
  });
  afterEach(() => localStorage.clear());

  const mensagem = 'No favorite pokemon found';
  test(`Testa se é exibido a mensagem ${mensagem}, se não tiver pokémons favoritos.`,
    () => {
      renderWithRouter('/favorites');
      const pokemonsFavorites = JSON.parse(localStorage.getItem('favoritePokemonIds'));
      const text = screen.getByText(mensagem);

      expect(pokemonsFavorites.length).toBe(0);
      expect(text).toBeInTheDocument();
    });
});
