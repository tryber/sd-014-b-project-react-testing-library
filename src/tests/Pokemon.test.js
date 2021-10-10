import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import RenderWithRouter from '../RenderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    const pokemon = pokemons[0];
    const { name, type, averageWeight: { value, measurementUnit }, image } = pokemon;
    RenderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName.textContent).toBe(name);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.textContent).toBe(type);
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight.textContent).toBe(`Average weight: ${value} ${measurementUnit}`);
    const pokemonImage = screen.getByRole('img', { name: `${name} sprite` });
    expect(pokemonImage).toHaveAttribute('src', image);
  });
  it(`Teste se o card do Pokémon indicado na Pokédex contém um link de
  navegação para exibir detalhes deste Pokémon.
  O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido`, () => {
    const pokemon = pokemons[0];
    const { id } = pokemon;
    RenderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);
    const moreDetailsLink = screen.getByRole('link', { name: 'More details' });
    expect(moreDetailsLink).toBeInTheDocument();
    expect(moreDetailsLink).toHaveAttribute('href', `/pokemons/${id}`);
  });
  it(`Teste se ao clicar no link de navegação do Pokémon,
  é feito o redirecionamento da aplicação para a página de detalhes de Pokémon e
  se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do
  Pokémon cujos detalhes se deseja ver`, () => {
    const pokemon = pokemons[0];
    const { id } = pokemon;
    const { history } = RenderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite={ false } />,
    );
    const moreDetailsLink = screen.getByRole('link', { name: 'More details' });
    expect(moreDetailsLink).toBeInTheDocument();
    expect(moreDetailsLink).toHaveAttribute('href', `/pokemons/${id}`);
    fireEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });
  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const pokemon = pokemons[0];
    const { name } = pokemon;
    RenderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);
    const favorite = screen.getByRole('img', {
      name: `${name} is marked as favorite`,
    });
    expect(favorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
