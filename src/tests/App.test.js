import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

// Requisito 1
describe('Testa o componente App',
  () => {
    test('Se os links `Home`, `About`, e `Favorite` existem', () => {
      renderWithRouter(<App />);

      const linkHome = screen.getByRole('link', { name: 'Home' });
      const linkAbout = screen.getByRole('link', { name: 'About' });
      const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });

      expect(linkHome).toBeInTheDocument();
      expect(linkAbout).toBeInTheDocument();
      expect(linkFavorite).toBeInTheDocument();
    });

    test('Se a aplicação é direcionada para a rota `/` quando clica no botão `Home`',
      () => {
        const { history } = renderWithRouter(<App />);
        const linkHome = screen.getByRole('link', { name: 'Home' });

        userEvent.click(linkHome);
        expect(history.location.pathname).toBe('/');
      });

    test('Se a aplicação é direcionada para a rota `/about` quando clica em `About`',
      () => {
        const { history } = renderWithRouter(<App />);
        const linkAbout = screen.getByRole('link', { name: 'About' });

        userEvent.click(linkAbout);
        expect(history.location.pathname).toBe('/about');
      });

    test(`Se a aplicação é direcionada para a rota '/favorites'
    quando clica em 'Favorite Pokémons'`, () => {
      const { history } = renderWithRouter(<App />);
      const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });

      userEvent.click(linkFavorite);
      expect(history.location.pathname).toBe('/favorites');
    });

    test(`Se a aplicação é direcionada para a página 'Not Found'
    quando entrar em uma URL desconhecida`, () => {
      const { history } = renderWithRouter(<App />);
      history.push('/url-desconhecida');

      const gifNotFound = screen
        .getByAltText('Pikachu crying because the page requested was not found');

      expect(gifNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    });
  });
