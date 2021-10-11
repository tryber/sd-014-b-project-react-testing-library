import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

const FAVORITE_POKEMONS = 'Favorite Pokémons';
const HOME = 'Home';
const ABOUT = 'About';

describe('Teste o componente <App.js />.',
  () => {
    test('Se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
      const customHistory = createMemoryHistory();
      render(
        <Router history={ customHistory }>
          <App />
        </Router>,
      );

      const home = screen.getByRole('link', { name: HOME });
      const about = screen.getByRole('link', { name: ABOUT });
      const favoritePokemons = screen.getByRole('link', { name: FAVORITE_POKEMONS });

      expect(home).toBeInTheDocument();
      expect(about).toBeInTheDocument();
      expect(favoritePokemons).toBeInTheDocument();
    });

    test('Se ao clicar no link Home da barra de navegação renderiza a página inicial',
      () => {
        const customHistory = createMemoryHistory();
        render(
          <Router history={ customHistory }>
            <App />
          </Router>,
        );
        const linkHome = screen.getByRole('link', { name: HOME });
        userEvent.click(linkHome);
        const home = screen.getByRole('link', { name: HOME });

        expect(customHistory.location.pathname).toBe('/');
        expect(home).toBeInTheDocument();
      });

    test('Se ao clicar no link About da barra de navegação renderiza a página about',
      () => {
        const customHistory = createMemoryHistory();
        render(
          <Router history={ customHistory }>
            <App />
          </Router>,
        );
        const linkAbout = screen.getByRole('link', { name: ABOUT });
        userEvent.click(linkAbout);
        const about = screen.getByRole('link', { name: ABOUT });

        expect(customHistory.location.pathname).toBe('/about');
        expect(about).toBeInTheDocument();
      });

    test('Se ao clicar no link Favoritados renderiza a página favorites',
      () => {
        const customHistory = createMemoryHistory();
        render(
          <Router history={ customHistory }>
            <App />
          </Router>,
        );

        const linkFavorites = screen.getByRole('link', { name: FAVORITE_POKEMONS });
        userEvent.click(linkFavorites);
        const favoritePokemons = screen.getByRole('link', { name: FAVORITE_POKEMONS });

        expect(customHistory.location.pathname).toBe('/favorites');
        expect(favoritePokemons).toBeInTheDocument();
      });
  });
