import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import renderWithRouter from './utils/renderWithRouter';

import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';
import App from '../App';
import { Pokemon } from '../components';

describe('Requisito 6 - Testa o componente <Pokemon.js />', () => {
  test('Se é renderizado um card com as info do pokémon', () => {
    const { name, type, image, averageWeight: { value, measurementUnit } } = pokemons[0];

    renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);

    const expectWeight = screen.getByTestId('pokemon-weight');
    const { textContent } = screen.getByTestId('pokemon-name');
    const expectedType = screen.getByTestId('pokemon-type');
    const expectedIMG = screen.getByRole('img', {
      name: `${name} sprite`,
    });

    expect(expectWeight.textContent).toBe(`Average weight: ${value} ${measurementUnit}`);
    expect(textContent).toBe(name);
    expect(expectedType.textContent).toBe(type);
    expect(expectedIMG).toHaveAttribute('src', image);
  });

  test('o botão More Details', () => {
    const { history } = renderWithRouter(<App />);

    const expectedButton = screen.getByRole(
      'link', {
        name: 'More details',
      },
    );
    expect(expectedButton).toBeInTheDocument();

    fireEvent.click(expectedButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    const expectedFavPoke = pokemons.map((({ name }) => name));

    expectedFavPoke.forEach((pokemonName) => {
      const expectedPokeIMG = screen.getByRole('img', {
        name: `${pokemonName} is marked as favorite`,
      });
      expect(expectedPokeIMG).toHaveAttribute('src', '/star-icon.svg');
    });
  });
});
