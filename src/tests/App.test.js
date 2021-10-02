import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 01', () => {
  test(
    'Se a aplicação é redirecionada para a página inicial,'
    + 'na URL / ao clicar no link Home da barra de navegação',
    () => {
      const { history } = renderWithRouter(<App />);

      const linkHome = screen.getByRole('link', { name: 'Home' });

      userEvent.click(linkHome);

      const title = screen.getByRole('heading', {
        level: 2,
        name: 'Encountered pokémons',
      });

      expect(history.location.pathname).toBe('/');

      expect(title).toBeInTheDocument();
    },
  );

  test(
    'Se a aplicação é redirecionada para a página de About,'
    + 'na URL /about, ao clicar no link About da barra de navegação.',
    () => {
      const { history } = renderWithRouter(<App />);

      const linkHome = screen.getByRole('link', { name: 'About' });

      userEvent.click(linkHome);

      const text = screen.getByText('This application simulates a Pokédex,'
        + ' a digital encyclopedia containing all Pokémons');

      expect(history.location.pathname).toBe('/about');

      expect(text).toBeInTheDocument();
    },
  );

  test(
    'Se a aplicação é redirecionada para a página de Favorite Pokémons,'
      + 'na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.',
    () => {
      const { history } = renderWithRouter(<App />);

      const linkHome = screen.getByRole('link', { name: 'Favorite Pokémons' });

      userEvent.click(linkHome);

      const title = screen.getByRole('heading', {
        level: 2,
        name: 'Favorite pokémons',
      });

      expect(history.location.pathname).toBe('/favorites');

      expect(title).toBeInTheDocument();
    },
  );

  test(
    'Se a aplicação é redirecionada para a página'
      + 'Not Found ao entrar em uma URL desconhecida',
    () => {
      const { history } = renderWithRouter(<App />);

      history.push('/notFound');

      const title = screen.getByText('😭');

      expect(title).toBeInTheDocument();
    },
  );
});
