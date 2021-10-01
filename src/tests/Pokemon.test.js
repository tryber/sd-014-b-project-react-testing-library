import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { Pokemon } from '../components';
import pokemons from '../data';

describe('Verifica se o componente Pokemon', () => {
  test('Mostra as informações detalhadas do Pokemon', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Pokemon
          pokemon={ pokemons[0] }
          isFavorite
        />
      </Router>,
    );

    const { name, type, averageWeight: { value, measurementUnit }, image } = pokemons[0];
    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName).toHaveTextContent(name);
    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType).toHaveTextContent(type);
    const pokeWeight = screen.getByTestId('pokemon-weight');
    expect(pokeWeight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    const pokeImage = screen.getByRole('img', { name: `${name} sprite` });
    expect(pokeImage.src).toBe(image);
  });

  test('contém um link de navegação', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Pokemon
          pokemon={ pokemons[0] }
          isFavorite
        />
      </Router>,
    );

    const { id } = pokemons[0];
    const link = screen.getByRole('link');
    expect(link.href).toContain(`/pokemons/${id}`);
  });

  test('ao clicar no link a página é redirecionada corretamente', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Pokemon
          pokemon={ pokemons[0] }
          isFavorite
        />
      </Router>,
    );

    const { id } = pokemons[0];
    const link = screen.getByRole('link');
    userEvent.click(link);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  test('Existe um ícone de estrela nos Pokemons favoritados', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Pokemon
          pokemon={ pokemons[0] }
          isFavorite
        />
      </Router>,
    );

    const { name } = pokemons[0];
    const favStar = screen.getByRole('img', { name: `${name} is marked as favorite` });
    expect(favStar).toBeInTheDocument();
    expect(favStar.src).toContain('/star-icon.svg');
  });
});
