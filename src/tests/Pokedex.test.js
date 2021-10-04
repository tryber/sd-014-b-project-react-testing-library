import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente Pokedex', () => {
  test(`Teste se página contém um heading h2
  com o texto Encountered pokémons`, () => {
    renderWithRouter(<App />);

    const findH2 = screen.getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });
    expect(findH2).toBeInTheDocument();
  });

  test(`Teste se é exibido o próximo Pokémon
  da lista quando o botão Próximo pokémon é clicado`, () => {
    renderWithRouter(<App />);

    const buttonFire = screen.getByRole('button', { name: 'Fire' });
    fireEvent.click(buttonFire);

    // const buttonNext = screen.getByText('Próximo pokémon');
    fireEvent.click(screen.getByText('Próximo pokémon'));

    const rapidash = screen.getByText('Rapidash');
    expect(rapidash).toBeInTheDocument();
  });

  test(`Os próximos Pokémons da lista devem ser mostrados, um a um,
   ao clicar sucessivamente no botão`, () => {
    renderWithRouter(<App />);
    const buttonFire = screen.getByRole('button', { name: 'Fire' });
    fireEvent.click(buttonFire);

    const nextbutton = screen.getAllByRole('button');
    fireEvent.click(nextbutton[8]);

    const numbersOfCards = screen.getAllByRole('img');
    expect(numbersOfCards.length).toBe(1);
  });

  test(`Deve existir um botão de filtragem para cada tipo de Pokémon,
  sem repetição`, () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: 'All' });
    const buttons = screen.getAllByTestId('pokemon-type-button');
    const numberOfButtons = 7;
    expect(buttonAll).toBeInTheDocument();
    expect(buttons.length).toBe(numberOfButtons);
  });

  test('A Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonBug = screen.getByRole('button', { name: 'Bug' });
    fireEvent.click(buttonBug);

    const buttonAll = screen.getByText('All');
    fireEvent.click(buttonAll);

    const nextPoke = screen.getByRole('button', { name: 'Próximo pokémon' });
    fireEvent.click(nextPoke);

    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();
  });
});
