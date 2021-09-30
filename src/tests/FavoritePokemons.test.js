import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente FavoritePokemons.js', () => {
  const fav = 'Favorite Pokémons';
  test('Testa se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: fav }));
    const noPokemon = screen.queryByText('No favorite pokemon found');
    expect(noPokemon).toBeInTheDocument();
  });
  test('Testa se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Electric' }));
    fireEvent.click(screen.getByRole('link', { name: 'More details' }));
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('link', { name: fav }));
    const favPokemon = screen.getByText('Pikachu', { exact: true });
    expect(favPokemon).toBeInTheDocument();
    fireEvent.click(screen.getByRole('link', { name: 'Home' }));
    fireEvent.click(screen.getByRole('button', { name: 'Fire' }));
    fireEvent.click(screen.getByRole('link', { name: 'More details' }));
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('link', { name: fav }));
    const favPokemon1 = screen.getByText('Pikachu', { exact: true });
    const favPokemon2 = screen.getByText('Charmander', { exact: true });
    expect(favPokemon1).toBeInTheDocument();
    expect(favPokemon2).toBeInTheDocument();
  });
});
