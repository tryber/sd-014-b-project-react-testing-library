import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';
import data from '../data';

describe('6 - Testa o componente Pokemon.js ', () => {
  test('Verifica se é renderizado um card com as informações de um pokémon', () => {
    renderWithRouter(<App />);
    const { name, type, image, averageWeight: { value, measurementUnit } } = data[0];

    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toHaveTextContent(name);

    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toHaveTextContent(type);

    const weigthPokemon = screen.getByTestId('pokemon-weight');
    expect(weigthPokemon)
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);

    const imagePokemon = screen.getByRole('img');
    expect(imagePokemon).toHaveAttribute('src', image);
    expect(imagePokemon).toHaveAttribute('alt', `${name} sprite`);
  });

  test('Verifica se o card do Pokémon indicado na Pokédex contém'
  + 'um link de navegação para exibir detalhes deste Pokémon', () => {
    renderWithRouter(<App />);

    const { id } = data[0];

    const linkDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(linkDetails).toBeInTheDocument();
    expect(linkDetails).toHaveAttribute('href', `/pokemons/${id}`);
  });

  test('Verifica se ao clicar no link de navegação do Pokémon,'
    + 'é feito o redirecionamento da aplicação para página de detalhes Pokémon', () => {
    renderWithRouter(<App />);
    const { name, id } = data[0];
    const linkDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkDetails);

    const pokemonDetails = screen.getByRole('heading', {
      level: 2,
      name: `${name} Details`,
    });
    expect(pokemonDetails).toBeInTheDocument();
    expect(linkDetails).toHaveAttribute('href', `/pokemons/${id}`);
  });

  test('Verifica se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const { name } = data[0];

    const linkDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkDetails);

    const favoriteCheckbox = screen.getByRole('checkbox',
      { name: 'Pokémon favoritado?' });
    userEvent.click(favoriteCheckbox);

    const imgFavorite = screen.getByRole('img', {
      name: `${name} is marked as favorite`,
    });
    expect(imgFavorite).toHaveAttribute('src', '/star-icon.svg');
    expect(imgFavorite).toHaveAttribute('alt', `${name} is marked as favorite`);
  });
});
