import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testa a aplicação do component Pokemon', () => {
  const MORE_DETAILS = 'More details';
  test('se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);

    const pikachu = pokemons[0];

    const pikachuName = screen.getByText(pikachu.name);
    expect(pikachuName).toBeInTheDocument();
    const pikachuType = screen.getByTestId('pokemon-type');
    expect(pikachuType).toHaveTextContent(pikachu.type);
    const pikachuAverage = screen
      .getByText(`Average weight: ${pikachu.averageWeight.value} kg`);
    expect(pikachuAverage).toBeInTheDocument();
    const pikachuImage = screen.getByRole('img');
    expect(pikachuImage).toHaveAttribute('src', `${pikachu.image}`);
    expect(pikachuImage).toHaveAttribute('alt', `${pikachu.name} sprite`);
  });

  test('se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: `${MORE_DETAILS}` });
    expect(linkMoreDetails).toBeInTheDocument();

    userEvent.click(linkMoreDetails);

    expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  test('se ao clicar no link de navegação do Pokémon', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: `${MORE_DETAILS}` });

    userEvent.click(linkMoreDetails);

    const title = screen.getByText('Game Locations of Pikachu');
    expect(title).toBeInTheDocument();
  });

  test('se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: `${MORE_DETAILS}` });

    userEvent.click(linkMoreDetails);

    const checkedFavorite = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(checkedFavorite).toBeInTheDocument();

    userEvent.click(checkedFavorite);

    const imageFavorite = screen.getAllByRole('img')[1];
    expect(imageFavorite).toHaveAttribute('src', '/star-icon.svg');
    expect(imageFavorite)
      .toHaveAttribute('alt', `${pokemons[0].name} is marked as favorite`);
  });
});
