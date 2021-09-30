import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente Pokemon', () => {
  const {
    id,
    name,
    type,
    image,
    averageWeight: {
      measurementUnit,
      value,
    },
  } = pokemons[0];

  test('se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
    expect(screen.getByTestId('pokemon-weight'))
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(screen.getByAltText(`${name} sprite`)).toHaveAttribute('src', image);
  });

  test('se o card contém link para exibir detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const pokemonDetails = screen.getByRole('link', { name: 'More details' });
    expect(pokemonDetails).toBeInTheDocument();
    userEvent.click(pokemonDetails);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  test('se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const pokemonDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(pokemonDetails);

    const checkboxFavorite = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?' });
    userEvent.click(checkboxFavorite);

    const starIcon = screen.getByRole('img', {
      name: `${name} is marked as favorite`,
    });
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
