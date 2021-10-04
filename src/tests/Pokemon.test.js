import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './renderWithRouter';
import Pokemons from '../data';
import Pokemon from '../components/Pokemon';

describe('Testa o componente <Pokemon.js />', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon.', () => {
    const pokemon = Pokemons[0];
    const { name, type, averageWeight: { value, measurementUnit }, image } = pokemon;

    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName.textContent).toBe(name);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.textContent).toBe(type);

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight.textContent)
      .toBe(`Average weight: ${value} ${measurementUnit}`);

    const pokemonImage = screen.getByRole('img', { name: `${name} sprite` });
    expect(pokemonImage).toHaveAttribute('src', image);
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um'
  + 'link de navegação para exibir detalhes deste Pokémon. ', () => {
    const pokemon = Pokemons[0];
    const { id } = pokemon;

    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);

    const detailsLink = screen.getByRole('link', { name: 'More details' });
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute('href', `/pokemons/${id}`);
  });

  it('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento'
  + 'da aplicação para a página de detalhes de Pokémon.', () => {
    const pokemon = Pokemons[0];
    const { id } = pokemon;

    const { history } = renderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite={ false } />,
    );

    const detailsLink = screen.getByRole('link', { name: 'More details' });
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute('href', `/pokemons/${id}`);

    userEvent.click(detailsLink);

    const { pathname } = history.location;

    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const pokemon = Pokemons[0];
    const { name } = pokemon;

    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);

    const isFavorite = screen.getByRole('img', {
      name: `${name} is marked as favorite`,
    });
    expect(isFavorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
