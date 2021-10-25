import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('se é renderizado um card com as informações de determinado pokémon', () => {
  const customHistory = createMemoryHistory();
  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );

  const getPikachu = screen.getByTestId('pokemon-name');

  expect(getPikachu).toContainHTML('Pikachu');

  const getPikachuType = screen.getByTestId('pokemon-type');

  expect(getPikachuType).toContainHTML('Electric');

  const getPikachuAverage = screen.getByTestId('pokemon-weight');

  expect(getPikachuAverage).toContainHTML('Average weight: 6.0 kg');

  const imgPikachu = screen.getByRole('img');

  expect(imgPikachu).toHaveAttribute('alt', 'Pikachu sprite');
  expect(imgPikachu).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test(`se o card do Pokémon indicado na Pokédex contém um 
link de navegação para exibir detalhes deste Pokémon.
 O link deve possuir a URL /pokemons/<id>,
  onde <id> é o id do Pokémon exibido`, () => {
  const customHistory = createMemoryHistory();
  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );

  const getMoreDetails = screen.getByRole('link', { name: 'More details' });

  userEvent.click(getMoreDetails);
  expect(customHistory.location.pathname).toBe('/pokemons/25');
});

// Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido;
