import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';
import { pokemons, isPokemonFavoriteById } from './PokemonMockAPI';

describe('Testa o Componente "Pokemon"', () => {
  test(`se é renderizado um card com as informações de determinado pokémon,
      como "nome" "tipo" "peso medio" e "imagem"`, () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ isPokemonFavoriteById[pokemons[0].id] }
    />);
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByAltText('Pikachu sprite');

    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('Pikachu');
    expect(type).toBeInTheDocument();
    expect(type).toHaveTextContent('Electric');
    expect(weight).toBeInTheDocument();
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test(`se o card do Pokémon indicado na Pokédex contém um 
  link de navegação para exibir detalhes deste Pokémon.`, () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ isPokemonFavoriteById[pokemons[0].id] }
    />);

    const link = screen.getByRole('link', { name: 'More details' });
    expect(link).toHaveAttribute('href', `/pokemons/${pokemons[0].id}`);
  });

  test(`se ao clicar no link de navegação do Pokémon, 
  é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.`, () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ isPokemonFavoriteById[pokemons[0].id] }
    />);

    const link = screen.getByRole('link', { name: 'More details' });
    userEvent.click(link);
    const path = history.location.pathname;
    expect(path).toBe(`/pokemons/${pokemons[0].id}`);
  });

  test('se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ isPokemonFavoriteById[pokemons[0].id] }
    />);
    const favoriteImg = screen.getByAltText('Pikachu is marked as favorite');

    expect(favoriteImg).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteImg)
      .toHaveAttribute('alt', `${pokemons[0].name} is marked as favorite`);
  });
});
