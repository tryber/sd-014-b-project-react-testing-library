import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

test('Deve exibir os dados do pokemon na tela', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );

  const pokemonName = screen.getByTestId('pokemon-name');
  const pokemonType = screen.getByTestId('pokemon-type');
  const pokemonWeight = screen.getByTestId('pokemon-weight');
  const pokemonImg = screen.getByAltText('Pikachu sprite');

  expect(pokemonName.innerHTML).toBe('Pikachu');
  expect(pokemonType.innerHTML).toBe('Electric');
  expect(pokemonWeight.innerHTML).toBe('Average weight: 6.0 kg');
  expect(pokemonImg.src).toEqual('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test('Se possui um link para "Mais Detalhes"', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );

  const moreDatails = screen.getByRole('link', { name: 'More details' });
  expect(moreDatails).toBeInTheDocument();

  userEvent.click(moreDatails);
  const path = history.location.pathname;
  expect(path).toEqual('/pokemons/25');
});

test('Se favortia pokemon na pagina de detalhes', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );

  const moreDatails = screen.getByRole('link', { name: 'More details' });
  userEvent.click(moreDatails);

  const favorite = screen.getByLabelText(/Pokémon favoritado?/i);
  userEvent.click(favorite);

  const pokemonFavorite = screen.getByAltText(/Pikachu is marked as favorite/i);
  expect(pokemonFavorite).toBeInTheDocument();
  expect(pokemonFavorite).toHaveAttribute('src', '/star-icon.svg');
});
