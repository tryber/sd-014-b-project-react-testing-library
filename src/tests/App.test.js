import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';
import App from '../App';

describe('testa o componente App.js', () => {
  test('se há o texto `Home` e na tela inicial e, se clicado , leva ao caminho correto',
    () => {
      const { history } = RenderWithRouter(<App />);
      const homeText = screen.getByRole('link', {
        name: 'Home',
      });
      expect(homeText).toBeInTheDocument();

      userEvent.click(homeText);
      expect(history.location.pathname).toBe('/');
    });

  test('se há o texto `About` e na tela inicial e, se clicado , leva ao caminho correto',
    () => {
      const { history } = RenderWithRouter(<App />);
      const aboutText = screen.getByRole('link', {
        name: 'About',
      });
      expect(aboutText).toBeInTheDocument();

      userEvent.click(aboutText);
      expect(history.location.pathname).toBe('/about');
    });

  test(`se há o texto 'Favorite Pokémons' e na tela inicial e, se clicado, leva ao caminho
   correto`,
  () => {
    const { history } = RenderWithRouter(<App />);
    const favoritesText = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(favoritesText).toBeInTheDocument();

    userEvent.click(favoritesText);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('se, ao ser passada uma rota inexistente, há aluma pagina informando isso', () => {
    const { history } = RenderWithRouter(<App />);
    history.push('/uma-pagina-inexistente');
    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });
    expect(notFoundText).toBeInTheDocument();
  });
});
