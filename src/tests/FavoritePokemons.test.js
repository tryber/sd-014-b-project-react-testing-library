import React from 'react';
import { render, screen } from '@testing-library/react';

import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa o componente "<FavoritePokemons.js />"', () => {
  it(`Deveria exibir na tela a mensagem "No favorite pokemon found" se a pessoa não tiver
  pokémons favorito`, () => {
    render(<FavoritePokemons />);

    const textNotFound = screen.getByText('No favorite pokemon found');
    expect(textNotFound).toBeInTheDocument();
  });

  it('Deveria ser exibido todos os cards de pokémons favoritados caso exista', () => {
    const pokemon = [{
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: { value: '6.0', measurementUnit: 'kg' },
      image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    }];

    renderWithRouter(<FavoritePokemons pokemons={ pokemon } />);

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Electric')).toBeInTheDocument();
    expect(screen.getByText('Average weight: 6.0 kg')).toBeInTheDocument();
  });
});
