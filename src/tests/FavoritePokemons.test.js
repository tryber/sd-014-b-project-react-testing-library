import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testa o Componente FavoritePokemons', () => {
  test(`Se é exibido na tela a mensagem
   'No favorite pokemon found', se a pessoa não tiver pokémons favoritos.`, () => {
    renderWithRouter(<FavoritePokemons />);

    const notFound = screen.getByText('No favorite pokemon found');

    expect(notFound).toBeInTheDocument();
  });

  test('se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: 'More details' }));
    userEvent.click(screen.getByRole('checkbox'));
    userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));

    // Observando o componente Pokemon.js, observei que existe um data-testid para 'nome, type, e weight'
    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toBeInTheDocument();
  });
});
