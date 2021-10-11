import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa a aplicação do component Pokédex', () => {
  test('Pagina tem um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const title = screen.getByRole('heading',
      { level: 2, name: 'Encountered pokémons' });
    expect(title).toBeInTheDocument();
  });

  test('Sera exibido o próximo Pokémon quando o botão Próximo pokémon é clicado.', () => {
    renderWithRouter(<App />);

    const buttonNextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(buttonNextPokemon).toBeInTheDocument();

    userEvent.click(buttonNextPokemon);

    const charmander = screen.getByText('Charmander');
    expect(charmander);
  });

  test('e a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);

    const ElectricType = screen.getByRole('button', { name: 'Electric' });
    expect(ElectricType).toBeInTheDocument();

    const fireType = screen.getByRole('button', { name: 'Fire' });
    expect(fireType).toBeInTheDocument();

    const bugType = screen.getByRole('button', { name: 'Bug' });
    expect(bugType).toBeInTheDocument();

    const poisonType = screen.getByRole('button', { name: 'Poison' });
    expect(poisonType).toBeInTheDocument();

    const PsychicType = screen.getByRole('button', { name: 'Psychic' });
    expect(PsychicType).toBeInTheDocument();

    const NormalType = screen.getByRole('button', { name: 'Normal' });
    expect(NormalType).toBeInTheDocument();

    const DragonType = screen.getByRole('button', { name: 'Dragon' });
    expect(DragonType).toBeInTheDocument();
  });

  test('Se a Pokédex tem um botao para resetar o filtro', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();

    const pikachu = screen.getByText('Pikachu');
    userEvent.click(buttonAll);
    expect(pikachu).toBeInTheDocument();
  });

  test('Se a Pokédex tem 7 botoes de filtro', () => {
    renderWithRouter(<App />);

    const buttonFilters = screen.getAllByTestId('pokemon-type-button');
    const numberTypesPokemon = 7;

    expect(buttonFilters.length).toBe(numberTypesPokemon);
  });
});
