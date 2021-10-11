import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokedex from '../data';
import Pokemon from '../components/Pokemon';

describe('Testa o componente Pokedex.js', () => {
  test('Testa se o nome correto do Pokémon é mostrado na tela', () => {
    renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: /home/i });
    userEvent.click(home);

    const pokeName = screen.getByTestId(/pokemon-name/i);
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const pokeImg = screen.getByRole('img');

    expect(pokeName).toHaveTextContent(/pikachu/i);
    expect(pokeType).toHaveTextContent(/electric/i);
    expect(pokeWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokeImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokeImg.alt).toBe('Pikachu sprite');
  });
  test('Testa se o card do pokémon possui link para ver detalhes', () => {
    renderWithRouter(<App />);

    const home = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(home);

    const { id } = pokedex[0];

    const details = screen.getByRole('link', {
      name: /more details/i,
    });

    expect(details.href).toBe(`http://localhost/pokemons/${id}`);
  });

  test('Testa se navega até a pagina de detalhes do pokémon', () => {
    const { id } = pokedex[0];

    const { history } = renderWithRouter(
      <Pokemon isFavorite={ false } pokemon={ pokedex[0] } />,
    );

    const details = screen.getByRole('link', {
      name: 'More details',
    });

    userEvent.click(details);

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  test('Testa se um pokémon é favoritado', () => {
    renderWithRouter(
      <Pokemon isFavorite pokemon={ pokedex[0] } />,
    );

    const icon = screen.getByRole('img', {
      name: /marked as favorite/i,
    });
    expect(icon).toBeInTheDocument();
    expect(icon.src).toMatch(/star-icon.svg/i);
    expect(icon.alt).toBe(`${pokedex[0].name} is marked as favorite`);
  });
});
