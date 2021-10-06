import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const pokeType = 'pokemon-type';
const nextPokemon = 'next-pokemon';

describe('Testa o componente <Pokedex.js />', () => {
  it(`Testa se página contém um heading h2
  com o texto Encountered pokémons.`, () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent('Encountered pokémons');
  });

  it(`Testa se é exibido o próximo Pokémonda lista
  quando o botão Próximo pokémon é clicado.`, () => {
    renderWithRouter(<App />);
    const nextPoke = screen.getByTestId(nextPokemon);
    expect(nextPoke).toHaveTextContent('Próximo pokémon');
  });

  it(`O primeiro Pokémon da lista deve ser mostrado
  ao clicar no botão, se estiver no último Pokémon da lista`, () => {
    renderWithRouter(<App />);
    const AMOUNT_POK = 9;
    const nextPoke = screen.getByTestId(nextPokemon);
    for (let index = 0; index < AMOUNT_POK; index += 1) {
      userEvent.click(nextPoke);
    }
    const pikachu = screen.getByText('pikachu', { exact: false });
    expect(pikachu).toBeInTheDocument();
  });

  it('Testa se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const image = screen.getAllByRole('img');
    expect(image.length).toBe(1);
  });
});

describe('Testa se a Pokédex tem os botões de filtro.', () => {
  it(`Testa se existe um botão de filtragem para
  cada tipo de Pokémon, sem repetição.`, () => {
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
    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(buttons.length).toBe(types.length);
    for (let index = 0; index < types.length; index += 1) {
      const type = types[index];
      expect(buttons[index]).toHaveTextContent(type);
    }
  });

  it(` Testa se a partir da seleção de um botão de tipo,
  a Pokédex deve circular somente pelos pokémons daquele tipo;`, async () => {
    renderWithRouter(<App />);
    const buttonPsychic = screen.getByText('Psychic');
    expect(buttonPsychic).toBeInTheDocument();
    userEvent.click(buttonPsychic);
    expect(screen.getByTestId(pokeType)).toHaveTextContent('Psychic');
    userEvent.click(buttonPsychic);
    expect(screen.getByTestId(pokeType)).toHaveTextContent('Psychic');
  });

  it('Testa se o botão ALL está smepre visível', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('All')).toBeInTheDocument();
  });
});

describe('Testa se a Pokédex contém um botão para resetar o filtro', () => {
  it('O texto do botão deve ser All', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByText('All');
    expect(buttonAll).toBeInTheDocument();
  });

  it('', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId(pokeType)).toHaveTextContent('Electric');
    userEvent.click(screen.getByTestId(nextPokemon));
    expect(screen.getByTestId(pokeType)).toHaveTextContent('Fire');
    userEvent.click(screen.getByText('All'));
    expect(screen.getByTestId(pokeType)).toHaveTextContent('Electric');
  });
});
