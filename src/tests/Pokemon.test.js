import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';
import { Pokemon } from '../components';

const nameTestId = 'pokemon-name';
const weightTestId = 'pokemon-weight';
const typeTestId = 'pokemon-type';
const pokemonObject = pokemons[0];
const detailsLinkPath = 'More details';

describe('06 - Teste o componente <Pokemon.js />', () => {
  test('a) Se é renderizado um card com as informações de determinado pokémon',
    () => {
      renderWithRouter(<Pokemon pokemon={ pokemonObject } />);

      const pokemonName = screen.getByTestId(nameTestId).innerHTML;
      expect(pokemonName).toBe(pokemonObject.name);

      const pokemonType = screen.getByTestId(typeTestId).innerHTML;
      expect(pokemonType).toBe(pokemonObject.type);

      const { value, measurementUnit } = pokemonObject.averageWeight;
      const pokemonWeight = screen.getByTestId(weightTestId).innerHTML;
      const pokemonWeightOnObject = `Average weight: ${value} ${measurementUnit}`;
      expect(pokemonWeight).toBe(pokemonWeightOnObject);

      const pokemonImage = screen.getByAltText(`${pokemonObject.name} sprite`);
      expect(pokemonImage.src).toContain(pokemonObject.image);
    });

  test('b) Se o card do Pokémon indicado na Pokédex contém um link de navegação',
    () => {
      renderWithRouter(<App />);

      const detailsLink = screen.getByRole('link', { name: detailsLinkPath });
      expect(detailsLink).toBeInTheDocument();
      expect(detailsLink).toHaveAttribute('href', `/pokemons/${pokemonObject.id}`);
    });

  test('c) Se ao clicar no link de navegação do Pokémon é feito o redirecionamento',
    () => {
      const { history } = renderWithRouter(<App />);

      const detailsLink = screen.getByRole('link', { name: detailsLinkPath });
      userEvent.click(detailsLink);

      expect(screen.getByText(`${pokemonObject.name} Details`)).toBeInTheDocument();
      expect(history.location.pathname).toBe(`/pokemons/${pokemonObject.id}`);
    });

  test('d) Se existe um ícone de estrela nos Pokémons favoritados',
    () => {
      renderWithRouter(<App />);

      const detailsLink = screen.getByRole('link', { name: detailsLinkPath });
      userEvent.click(detailsLink);

      const markAsFavorite = screen.getByLabelText('Pokémon favoritado?');
      userEvent.click(markAsFavorite);

      const pokemonImage = screen
        .getByAltText(`${pokemonObject.name} is marked as favorite`);
      expect(pokemonImage).toHaveAttribute('src', '/star-icon.svg');
    });
});
