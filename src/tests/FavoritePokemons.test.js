import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Componente FavoritePokemons', () => {
  it('Teste se é exibida a mensagem "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavFound = screen.getByText(/No favorite pokemon found/);

    expect(noFavFound).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pokemons/25');
    const favCheckbox = screen.getByRole('checkbox');
    userEvent.click(favCheckbox);

    history.push('/favorites');
    const favPokemon = screen.getByText(/Pikachu/i);

    expect(favPokemon).toBeInTheDocument();
  });
});

// Referência para o teste onde os cards são exibidos: https://github.com/tryber/sd-014-b-project-react-testing-library/pull/29/files
