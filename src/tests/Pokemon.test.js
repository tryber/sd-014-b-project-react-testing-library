import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Testa o componente Pokemon', () => {
  test('se é renderizado um card com as informações de determinado pokémon', () => {
    const pokemon = pokemons[0];
    const { name, type, averageWeight: { value, measurementUnit }, image } = pokemon;
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName.textContent).toBe(name);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.textContent).toBe(type);

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight.textContent).toBe(`Average weight: ${value} ${measurementUnit}`);

    const pokemonImage = screen.getByRole('img', { name: `${name} sprite` });
    expect(pokemonImage).toHaveAttribute('src', image);
  });

  test(`se o card do Pokémon indicado na Pokédex contém um link de navegação
  para exibir detalhes deste Pokémon`, () => {
    const pokemon = pokemons[0];
    const { id } = pokemon;

    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);

    const detailsLink = screen.getByRole('link', { name: 'More details' });
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute('href', `/pokemons/${id}`);
  });

  test(`se ao clicar no link de navegação do Pokémon, é feito o redirecionamento
  da aplicação para a página de detalhes de Pokémon`, () => {
    const pokemon = pokemons[0];
    const { id } = pokemon;

    const { history } = renderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite={ false } />,
    );

    const detailsLink = screen.getByRole('link', { name: 'More details' });
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute('href', `/pokemons/${id}`);

    fireEvent.click(detailsLink);

    const { pathname } = history.location;

    expect(pathname).toBe(`/pokemons/${id}`);
  });

  test('se existe um ícone de estrela nos Pokémons favoritados', () => {
    const pokemon = pokemons[0];
    const { name } = pokemon;

    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);

    const isFavorite = screen.getByRole('img', {
      name: `${name} is marked as favorite`,
    });
    expect(isFavorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
