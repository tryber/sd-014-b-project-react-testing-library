import { screen } from '@testing-library/react';
import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa a aplicação do component FavoritePokemons', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const title = screen.getByText(/No favorite pokemon found/);
    expect(title).toBeInTheDocument();
  });
});
