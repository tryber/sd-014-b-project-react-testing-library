import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderRouter from './renderRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibido na tela a mensagem', () => {
    renderRouter(<FavoritePokemons />);
    expect(screen.getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    renderRouter(<App />);
    const detailsBtn = screen.getByRole('link', { name: 'More details' });
    expect(detailsBtn).toBeInTheDocument();
    fireEvent.click(detailsBtn);

    const favCheck = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(favCheck).toBeInTheDocument();
    fireEvent.click(favCheck);

    const pokeFav = screen.getByRole('link', { name: 'Favorite Pokémons' });
    fireEvent.click(pokeFav);
    expect(pokeFav).toBeInTheDocument();

    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName).toBeInTheDocument();
  });
});
