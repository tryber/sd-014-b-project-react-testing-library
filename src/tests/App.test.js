import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

describe(
  'Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    test(
      'se o primeiro link possui o texto `Home` e o clique redireciona para URL `/`',
      () => {
        const history = createMemoryHistory();
        render(
          <Router history={ history }>
            <App />
          </Router>,
        );
        const homeLink = screen.getByRole('link', {
          name: 'Home',
        });

        userEvent.click(homeLink);

        expect(homeLink).toBeInTheDocument();
      },
    );

    test(
      'se o segundo link possui o texto `About` e o clique redireciona para URL `/about`',
      () => {
        const history = createMemoryHistory();
        render(
          <Router history={ history }>
            <App />
          </Router>,
        );
        const aboutLink = screen.getByRole('link', {
          name: 'About',
        });

        userEvent.click(aboutLink);

        expect(aboutLink).toBeInTheDocument();
      },
    );

    test(
      'terceiro link tem txt `Favorite Pokémons` e clique para URL`/favorites`', () => {
        const history = createMemoryHistory();
        render(
          <Router history={ history }>
            <App />
          </Router>,
        );
        const favoriteLink = screen.getByRole('link', {
          name: 'Favorite Pokémons',
        });

        userEvent.click(favoriteLink);

        expect(favoriteLink).toBeInTheDocument();
      },
    );
  },

);
