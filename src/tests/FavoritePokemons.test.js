import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa as funcionalidades da pagina Favorite Pokemon', () => {
  it('testa se possui uma mensagem para pokemon favorito não encontrado', () => {
    renderWithRouter(<App />);
    const mensage = screen.getByText(/Favorite Pokémons/i);
    userEvent.click(mensage);
    const mensageNotFound = screen.getByText(/No favorite pokemon found/i);
    expect(mensageNotFound).toBeInTheDocument();
  });

  it('testa se todos os cards são dos pokemons favoritados são exibidos', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);

    const favPokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favPokemons);
  });
});
