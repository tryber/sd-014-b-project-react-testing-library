import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe(
  'Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    test(
      'se o primeiro link possui o texto `Home` e o clique redireciona para URL `/`',
      () => {
        const { history } = renderWithRouter(<App />);

        const homeLink = screen.getByRole('link', {
          name: 'Home',
        });

        userEvent.click(homeLink);

        expect(homeLink).toBeInTheDocument();
        expect(history.location.pathname).toBe('/');
      },
    );

    test(
      'se o segundo link possui o texto `About` e o clique redireciona para URL `/about`',
      () => {
        const { history } = renderWithRouter(<App />);

        const aboutLink = screen.getByRole('link', {
          name: 'About',
        });

        userEvent.click(aboutLink);

        expect(aboutLink).toBeInTheDocument();
        expect(history.location.pathname).toBe('/about');
      },
    );

    test(
      'terceiro link tem txt `Favorite Pokémons` e clique para URL`/favorites`', () => {
        const { history } = renderWithRouter(<App />);

        const favoriteLink = screen.getByRole('link', {
          name: 'Favorite Pokémons',
        });

        userEvent.click(favoriteLink);

        expect(favoriteLink).toBeInTheDocument();
        expect(history.location.pathname).toBe('/favorites');
      },
    );

    test(
      'se renderiza página `Not Found`', () => {
        const { history } = renderWithRouter(<App />);
        history.push('/rota-que-nao-existe');

        const notFoundLink = screen.getByText('Page requested not found');
        expect(notFoundLink).toBeInTheDocument();
      },
    );
  },
);
