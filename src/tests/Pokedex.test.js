import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

beforeEach(() => renderWithRouter(<App />));

describe('Testa componentes da Pokedex', () => {
  const dataTestIdType = 'pokemon-type';
  test('se o título existe', () => {
    const titlePokedex = screen
      .getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(titlePokedex).toBeInTheDocument();
  });

  test('Verifica existência do botão Próximo Pokemon', () => {
    const buttonNext = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(buttonNext).toBeInTheDocument();
  });

  test('se, ao clicar no botão próximo pokemon, é de fato exibido outro', () => {
    const buttonNext = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(buttonNext);
    const nextPokemon = screen.getByText('Charmander');
    expect(nextPokemon).toBeInTheDocument();
  });

  test('se apenas um podemon é mostrado por vez', () => {
    const quantityPokemon = screen.getAllByTestId('pokemon-name');
    expect(quantityPokemon.length).toStrictEqual(1);
  });

  test('se o botão Electric existe e funciona', () => {
    const buttonElectric = screen.getByRole('button', { name: 'Electric' });
    expect(buttonElectric).toBeInTheDocument();

    userEvent.click(buttonElectric);
    const typePokemon = screen.getByTestId(dataTestIdType);
    expect(typePokemon.innerHTML).toBe('Electric');
  });

  test('se o botão Fire existe e funciona', () => {
    const buttonFire = screen.getByRole('button', { name: 'Fire' });
    expect(buttonFire).toBeInTheDocument();

    userEvent.click(buttonFire);
    const typePokemon = screen.getByTestId(dataTestIdType);
    expect(typePokemon.innerHTML).toBe('Fire');
  });

  test('se o botão Bug existe e funciona', () => {
    const buttonBug = screen.getByRole('button', { name: 'Bug' });
    expect(buttonBug).toBeInTheDocument();

    userEvent.click(buttonBug);
    const typePokemon = screen.getByTestId(dataTestIdType);
    expect(typePokemon.innerHTML).toBe('Bug');
  });

  test('se o botão Poison existe e funciona', () => {
    const buttonPoison = screen.getByRole('button', { name: 'Poison' });
    expect(buttonPoison).toBeInTheDocument();

    userEvent.click(buttonPoison);
    const typePokemon = screen.getByTestId(dataTestIdType);
    expect(typePokemon.innerHTML).toBe('Poison');
  });

  test('se o botão Psychic existe e funciona', () => {
    const buttonPsychic = screen.getByRole('button', { name: 'Psychic' });
    expect(buttonPsychic).toBeInTheDocument();

    userEvent.click(buttonPsychic);
    const typePokemon = screen.getByTestId(dataTestIdType);
    expect(typePokemon.innerHTML).toBe('Psychic');
  });

  test('se o botão Normal existe e funciona', () => {
    const buttonNormal = screen.getByRole('button', { name: 'Normal' });
    expect(buttonNormal).toBeInTheDocument();

    userEvent.click(buttonNormal);
    const typePokemon = screen.getByTestId(dataTestIdType);
    expect(typePokemon.innerHTML).toBe('Normal');
  });

  test('se o botão Dragon existe e funciona', () => {
    const buttonDragon = screen.getByRole('button', { name: 'Dragon' });
    expect(buttonDragon).toBeInTheDocument();

    userEvent.click(buttonDragon);
    const typePokemon = screen.getByTestId(dataTestIdType);
    expect(typePokemon.innerHTML).toBe('Dragon');
  });

  test('se os botões de filtro recebem o data testid "pokemon-type-button"', () => {
    const totalFilterButtons = 7;
    const quantityFiltersButton = screen.getAllByTestId('pokemon-type-button');
    expect(quantityFiltersButton.length).toBe(totalFilterButtons);
  });

  test('se o botão All existe e funciona', () => {
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();

    /* const dataButtonAll = screen.getByTestId('');
    expect(dataButtonAll.innerHTML).toBe('All'); */

    userEvent.click(buttonAll);
    const firstPokemon = screen.getByTestId('pokemon-name');
    expect(firstPokemon.innerHTML).toBe('Pikachu');
  });
});
