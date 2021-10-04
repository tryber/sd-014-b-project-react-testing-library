import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa a aplicação do component Pokédex', () => {
  test('se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const title = screen.getByRole('heading',
      { level: 2, name: 'Encountered pokémons' });
    expect(title).toBeInTheDocument();
  });

  test('se é exibido o próximo Pokémon quando o botão Próximo pokémon é clicado.', () => {
    renderWithRouter(<App />);

    const buttonNextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(buttonNextPokemon).toBeInTheDocument();

    userEvent.click(buttonNextPokemon);

    const charmander = screen.getByText('Charmander');
    expect(charmander);
  });

  test('e a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);

    const buttonElectric = screen.getByRole('button', { name: 'Electric' });
    expect(buttonElectric).toBeInTheDocument();

    const buttonFire = screen.getByRole('button', { name: 'Fire' });
    expect(buttonFire).toBeInTheDocument();

    const buttonBug = screen.getByRole('button', { name: 'Bug' });
    expect(buttonBug).toBeInTheDocument();

    const buttonPoison = screen.getByRole('button', { name: 'Poison' });
    expect(buttonPoison).toBeInTheDocument();

    const buttonPsychic = screen.getByRole('button', { name: 'Psychic' });
    expect(buttonPsychic).toBeInTheDocument();

    const buttonNormal = screen.getByRole('button', { name: 'Normal' });
    expect(buttonNormal).toBeInTheDocument();

    const buttonDragon = screen.getByRole('button', { name: 'Dragon' });
    expect(buttonDragon).toBeInTheDocument();
  });

  test('se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();

    const pikachu = screen.getByText('Pikachu');
    userEvent.click(buttonAll);
    expect(pikachu).toBeInTheDocument();
  });

  test('se a Pokédex contém 7 botões de filtro', () => {
    renderWithRouter(<App />);

    const buttonFilters = screen.getAllByTestId('pokemon-type-button');
    const numberTypesPokemon = 7;

    expect(buttonFilters.length).toBe(numberTypesPokemon);
  });
});
