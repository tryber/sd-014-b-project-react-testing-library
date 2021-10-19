import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Requisito 5 - Teste o componente Pokedex', () => {
  test('se a página contém um h2 com o texto Encountered pokémons ', () => {
    renderWithRouter(<App />);

    const subtitle = screen.getByRole('heading',
      { level: 2, name: 'Encountered pokémons' });

    expect(subtitle).toBeInTheDocument();
  });

  test('se é exibido o próximo pokémon da lista quando é clicado', () => {
    renderWithRouter(<App />);

    const buttonNext = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(buttonNext).toBeInTheDocument();
  });

  test('se a pokédex tem botões de filtro', () => {
    renderWithRouter(<App />);

    const buttonPsychic = screen.getByRole('button', { name: 'Psychic' });
    expect(buttonPsychic).toBeInTheDocument();
  });

  test('se existe um botão de filtro para cada tipo de pokémon', () => {
    renderWithRouter(<App />);
    const types = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    const numberTypes = 7;

    const totalButtons = screen.getAllByTestId('pokemon-type-button');
    expect(totalButtons).toHaveLength(numberTypes);

    expect(types.length).toBe(numberTypes);
  });

  test('se clicar em um botão mostre somente pokémons daquele tipo', () => {
    renderWithRouter(<App />);

    const psychicType = screen.getByRole('button', { name: 'Psychic' });
    userEvent.click(psychicType);

    const pokemonAlakazam = screen.getByText('Alakazam');
    expect(pokemonAlakazam).toBeInTheDocument();

    const next = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(next);

    const pokemonMew = screen.getByText('Mew');
    expect(pokemonMew).toBeInTheDocument();
  });

  test('se existe um botão de resetar com o texto All', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();

    userEvent.click(buttonAll);

    const pokemonOne = screen.getByText('Pikachu');
    expect(pokemonOne).toBeInTheDocument();
  });
});
