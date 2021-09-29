import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Teste se o topo da aplicaçãocontém um conjunto fixo de links de navegação',
  () => {
    test('O primeiro link deve possuir o texto Home', () => {
      const history = createMemoryHistory();
      render(
        <Router history={ history }>
          <App />
        </Router>,
      );

      const link = screen.getByRole('link', { name: 'Home' });
      userEvent.click(link);

      const title = screen.getByRole('heading', {
        level: 2,
        name: 'Encountered pokémons',
      });

      expect(title).toBeInTheDocument();
    });

    test('O primeiro link deve possuir o texto About', () => {
      const history = createMemoryHistory();
      render(
        <Router history={ history }>
          <App />
        </Router>,
      );

      const link = screen.getByRole('link', { name: 'About' });
      userEvent.click(link);

      const title = screen.getByRole('heading', {
        level: 2,
        name: 'About Pokédex',
      });

      expect(title).toBeInTheDocument();
    });

    test('O primeiro link deve possuir o texto Favorite pokémons', () => {
      const history = createMemoryHistory();
      render(
        <Router history={ history }>
          <App />
        </Router>,
      );

      const link = screen.getByRole('link', { name: 'Favorite Pokémons' });
      userEvent.click(link);

      const title = screen.getByRole('heading', {
        level: 2,
        name: 'Favorite pokémons',
      });

      expect(title).toBeInTheDocument();
    });
  });
