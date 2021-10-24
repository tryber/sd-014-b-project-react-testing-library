import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('Se aparece "No favorite pokemon found" quando nao tiver pokemon', () => {
  const customHistory = createMemoryHistory();
  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );

  const linkFavoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });

  userEvent.click(linkFavoritePokemons);

  const notFound = screen.getByText('No favorite pokemon found');
  expect(notFound).toBeInTheDocument();
});

test('se é exibido todos os cards de pokémons favoritados', () => {
  const customHistory = createMemoryHistory();
  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );

  const linkMoreDetails = screen.getByRole('link', { name: 'More details' });

  userEvent.click(linkMoreDetails);

  const checkBoxRole = screen.getByRole('checkbox');
  userEvent.click(checkBoxRole);

  const linkFavoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });

  userEvent.click(linkFavoritePokemons);

  const namePikachu = screen.getByTestId('pokemon-name');
  expect(namePikachu).toContainHTML('Pikachu');
});
