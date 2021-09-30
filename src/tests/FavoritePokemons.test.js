import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import RenderWithRouter from './RenderWithRouter';
import App from '../App';

describe('testa o componente FavoritePokemons.js', () => {
  test(`se é exibido na tela a mensagem 'No favorite pokemon found',
  se a pessoa não tiver pokémons favoritos.`, () => {
    RenderWithRouter(<FavoritePokemons />);
    const noPokemonText = screen.getByText(/No favorite pokemon found/);
    expect(noPokemonText).toBeInTheDocument();
  });

  test('se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = RenderWithRouter(<App />);
    const detailsButton = screen.getByRole('link', {
      name: 'More details',
    });
    userEvent.click(detailsButton);

    const favoriteCheckbox = screen.getByRole('checkbox');
    userEvent.click(favoriteCheckbox);

    history.push('/favorites');

    const averageWeightText = screen.getByText(/Average weight/);
    expect(averageWeightText).toBeInTheDocument();
  });
});
