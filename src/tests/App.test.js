import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa a aplicação App', () => {
  test('Se é renderizado o conjunto de links Home, About e Favorite Pokémons', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: 'Home',
    });
    const aboutLink = screen.getByRole('link', {
      name: 'About',
    });
    const favPokeLink = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favPokeLink).toBeInTheDocument();
  });

  test('Se é direcionada para a página Not Found ao entrar em URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/rota-que-nao-existe');

    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });
    expect(notFoundText).toBeInTheDocument();
  });
});
