import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('requisito 5', () => {
  test('se a pasta contem um h2 com texto X', () => {
    renderWithRouter(<App />);
    const textEncPoke = screen.getByRole('heading', { level: 2 });
    expect(textEncPoke).toBeInTheDocument();
  });

  test('se é exibido o proximo poke depois de clicar', () => {
    renderWithRouter(<App />);

    const btnPoke = screen.getByText('Próximo pokémon');
    expect(btnPoke).toHaveTextContent('Próximo pokémon');
    userEvent.click(btnPoke);
    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokeName).toBeInTheDocument();
    expect(pokeType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
  });

  test('se é mostrado apenas um pokemon por vez', () => {
    renderWithRouter(<App />);
    const btnPoke = screen.getByTestId('next-pokemon');
    userEvent.click(btnPoke);
    const poke = screen.getAllByTestId('pokemon-name');
    expect(poke.length).toStrictEqual(1);
  });

  test('se tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const buttons = screen.getAllByTestId('pokemon-type-button');
    const numBtn = 7;
    expect(buttons.length).toStrictEqual(numBtn);
    const difbtn = buttons.every((elem, index) => elem !== buttons[index]);
    expect(difbtn).toBe(false);

    const buttonType = screen.getAllByText('Electric');
    fireEvent.click(buttonType[1]);
    const typeBtn = buttonType.every((elem, index) => elem === buttonType[index]);
    expect(typeBtn).toBe(true);

    const btns = screen.getAllByTestId('pokemon-type-button');
    expect(btns[0]).toHaveTextContent('Electric');
    expect(btns[1]).toHaveTextContent('Fire');
    expect(btns[2]).toHaveTextContent('Bug');
    expect(btns[3]).toHaveTextContent('Poison');
    expect(btns[4]).toHaveTextContent('Psychic');
    expect(btns[5]).toHaveTextContent('Normal');
    expect(btns[6]).toHaveTextContent('Dragon');
    const bttss = screen.getByText('All');
    expect(bttss).toBeInTheDocument();

    expect(bttss).toHaveTextContent('All');

    userEvent.click(bttss);
    const pokeSelected = screen.getByText('Pikachu');
    expect(pokeSelected).toBeInTheDocument();
  });
});
