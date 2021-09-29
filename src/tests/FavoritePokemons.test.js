import React from 'react';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { FavoritePokemons } from '../components';
/* import App from '../App'; */

describe('Testa o componente favoritePokemons', () => {
  test('Teste se sem favoritos aparece a mensagem No favorite pokemon found', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <FavoritePokemons />
      </Router>,
    );
    const text = screen.getByText('No favorite pokemon found');

    expect(text).toBeInTheDocument();
  });

  test('Testa se é exibido o card pokemon favoritado', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <FavoritePokemons />
        ,
      </Router>,
    );
    const favButton = screen.getByAltText(/is marked as favorite/);

    expect(favButton).toHaveAttribute('src');
  });
});
