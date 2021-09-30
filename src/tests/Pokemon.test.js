import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { Pokemon } from '../components';
import firstPokemon from './firstPokemon';
import App from '../App';

const { name, type, averageWeight: { measurementUnit, value }, image, id } = firstPokemon;
const averageWeight = `Average weight: ${value} ${measurementUnit}`;

describe('Teste o componente <Pokemon.js />', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(name);
  });
  it('O tipo correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(type);
  });
  it('O peso correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent(averageWeight);
  });
  it('O imagem correta do Pokémon deve ser mostrada na tela', () => {
    renderWithRouter(<App />);

    const pokemonImg = screen.getByRole('img', { name: `${name} sprite` });
    expect(pokemonImg).toHaveAttribute('src', image);
  });
  it(`Os id correto do Pokémon deve ser usado de rota para detalhes
  e se existe um ícone de estrela nos Pokémons favoritados`, () => {
    const { history } = renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: 'More details' });
    userEvent.click(details);
    expect(details).toHaveAttribute('href', `/pokemons/${id}`);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
    const favIcon = screen.getByRole('checkbox');
    userEvent.click(favIcon);
    const imgFavorite = screen.getByRole('img',
      { name: `${name} is marked as favorite` });
    expect(imgFavorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
