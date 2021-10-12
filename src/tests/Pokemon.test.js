import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';
import { FavoritePokemons, Pokemon } from '../components';

describe('Requisito 6 - Testa o componente <Pokemon.js />', () => {
  test('Verifica se é renderizado um card'
        + 'com as informações de um determinado Pokémon', () => {
    const { name, type, image, averageWeight: { value, measurementUnit } } = pokemons[0];

    renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);

    const { textContent } = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByRole('img', {
      name: `${name} sprite`,
    });

    expect(textContent).toBe(name);
    expect(pokemonType.textContent).toBe(type);
    expect(pokemonWeight.textContent).toBe(`Average weight: ${value} ${measurementUnit}`);
    expect(pokemonImage).toHaveAttribute('src', image);
  });

  test('Verifica o link para mais detalhes sobre o Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole(
      'link', {
        name: 'More details',
      },
    );
    expect(details).toBeInTheDocument();
    fireEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Verifica se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    const pokemonNameList = pokemons.map((({ name }) => name));

    pokemonNameList.forEach((pokemon) => {
      const pokemonCard = screen.getByRole('img', {
        name: `${pokemon} is marked as favorite`,
      });
      expect(pokemonCard).toHaveAttribute('src', '/star-icon.svg');
    });
  });
});
