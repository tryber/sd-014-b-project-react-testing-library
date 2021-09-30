import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente `<Pokemon.js />`', () => {
  const {
    averageWeight:
    { measurementUnit,
      value,
    },
    name,
    type,
    image,
    id } = pokemons[0];

  describe('se é renderizado um card com as informações de determinado pokémon', () => {
    test(' se o nome correto do Pokémon deve ser mostrado na tela', () => {
      renderWithRouter(<App />);
      const pokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonName).toBeInTheDocument();

      const pikachuName = screen.getByText(name);
      expect(pikachuName).toBeInTheDocument();
    });

    test(' se o tipo correto do pokémon deve ser mostrado na tela.', () => {
      renderWithRouter(<App />);
      const pokemonType = screen.getByTestId('pokemon-type');
      expect(pokemonType).toBeInTheDocument();
      expect(pokemonType).toHaveTextContent(type);
    });

    test(
      `se o peso médio do pokémon deve ser exibido com um texto no formato
      Average weight: <value> <measurementUnit>.`,
      () => {
        renderWithRouter(<App />);
        const pokemonWeight = screen.getByTestId('pokemon-weight');
        expect(pokemonWeight).toBeInTheDocument();
        expect(pokemonWeight).toHaveTextContent(
          `Average weight: ${value} ${measurementUnit}`,
        );
      },
    );

    test('se a imagem do Pokémon é exibida', () => {
      renderWithRouter(<App />);
      const pokemonImage = screen.getByRole('img');
      expect(pokemonImage).toHaveAttribute('src', `${image}`);
      expect(pokemonImage).toHaveAttribute('alt', `${name} sprite`);
    });
  });

  test(`se o card do Pokémon indicado na Pokédex contém um link de
  navegação para exibir detalhes deste Pokémon.O link deve possuir a URL
  /pokemons/<id>, onde <id> é o id do Pokémon exibido`,
  () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: 'More details',
    });
    expect(detailsLink).toBeInTheDocument();

    userEvent.click(detailsLink);

    expect(history.location.pathname).toBe(`/pokemons/${id}`);

    const checkboxFavorite = screen.getByRole('checkbox');
    expect(checkboxFavorite).toBeInTheDocument();

    userEvent.click(checkboxFavorite);

    const starFavoriteImage = screen.getAllByRole('img')[1];
    expect(starFavoriteImage).toHaveAttribute('src', '/star-icon.svg');
    expect(starFavoriteImage).toHaveAttribute('alt', `${name} is marked as favorite`);
    expect(starFavoriteImage).toBeInTheDocument();
  });
});
