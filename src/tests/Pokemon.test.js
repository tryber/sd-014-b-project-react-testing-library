import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import data from '../data';
import renderWithRouter from './renderWithRouter ';

describe('Testando o componente "Pokemon.js"', () => {
  test('Verificar se rederiza o nome correto do pokémon no card.', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');
  });

  test('Verificar se rederiza o nome correto do pokémon no card.', () => {
    renderWithRouter(<App />);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');
  });

  test('Verificar se o peso médio do pokémon é renderizado corretamente.', () => {
    renderWithRouter(<App />);
    const pokemonAverage = screen.getByTestId('pokemon-weight');
    const averageValue = `${data[0].averageWeight.value}`;
    const averageMeasurementUnit = `${data[0].averageWeight.measurementUnit}`;
    expect(pokemonAverage)
      .toHaveTextContent(`Average weight: ${averageValue} ${averageMeasurementUnit}`);
  });

  test('Verificar se o gif do pokémon é renderizado corretamente.', () => {
    renderWithRouter(<App />);
    const pokemonName = `${data[0].name}`;
    const pokemonGif = screen.getByAltText(`${pokemonName} sprite`);
    expect(pokemonGif).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Verificar se rederiza o link "More details" no card.', () => {
    const { history } = renderWithRouter(<App />);
    const LinkMoreDetails = screen.getByRole('link', { name: 'More details' });
    const pokemonId = `${data[0].id}`;
    expect(LinkMoreDetails).toBeInTheDocument();
    userEvent.click(LinkMoreDetails);
    expect(history.location.pathname).toBe(`/pokemons/${pokemonId}`);
    const summary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(summary).toBeInTheDocument();
  });

  test('Verificar se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    const LinkMoreDetails = screen.getByRole('link', { name: 'More details' });
    expect(LinkMoreDetails).toBeInTheDocument();
    const pokemonName = `${data[0].name}`;
    const pokemonId = `${data[0].id}`;
    history.push(`/pokemons/${pokemonId}`);
    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);
    const starIcon = screen.getByAltText(`${pokemonName} is marked as favorite`);
    expect(starIcon).toBeInTheDocument();
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
