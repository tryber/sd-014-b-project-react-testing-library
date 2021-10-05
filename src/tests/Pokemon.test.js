import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import { Pokemon } from '../components';
import data from '../data';

describe('6 - Teste o componente Pokemon', () => {
  it('se é renderizado um card com as informações de determinado pokémon', () => {
    const { name, type, image, averageWeight: { value, measurementUnit } } = data[0];
    renderWithRouter(<Pokemon pokemon={ data[0] } isFavorite={ false } />);

    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon.textContent).toBe(name);

    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon.textContent).toBe(type);

    const weightPokemon = screen.getByTestId('pokemon-weight');
    expect(weightPokemon.textContent).toBe(`Average weight: ${value} ${measurementUnit}`);

    const imgPokemon = screen.getByRole('img', { name: `${name} sprite` });
    expect(imgPokemon).toHaveAttribute('src', image);
  });

  it('se o card, contém um link de navegação para exibir detalhes', () => {
    const { id } = data[0];
    renderWithRouter(<Pokemon pokemon={ data[0] } isFavorite={ false } />);

    const details = screen.getByRole('link', { name: 'More details' });
    expect(details).toBeInTheDocument();
    expect(details).toHaveAttribute('href', `/pokemons/${id}`);
  });

  it('se ao clicar no link de navegação do Pokémon, é feito o redirecionamento', () => {
    const { id } = data[0];
    const { history } = renderWithRouter(
      <Pokemon pokemon={ data[0] } isFavorite={ false } />,
    );

    const details = screen.getByRole('link', { name: 'More details' });
    userEvent.click(details);

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { name } = data[0];
    renderWithRouter(
      <Pokemon pokemon={ data[0] } isFavorite />,
    );

    const imgFavorite = screen.getByRole('img',
      { name: `${name} is marked as favorite` });
    expect(imgFavorite).toBeInTheDocument();
    expect(imgFavorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
