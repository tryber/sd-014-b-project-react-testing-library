import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('5. Teste o componente <Pokedex.js />', () => {
  test('se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(title).toBeInTheDocument();
  });

  test(`se é exibido o próximo Pokémon da lista 
  quando o botão Próximo pokémon é clicado.`, () => {
    renderWithRouter(<App />);
    const buttonName = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(buttonName).toBeInTheDocument();
  });

  test('se só mostra um pokemon por vez', () => {
    renderWithRouter(<App />);
    const title = screen.getAllByTestId('pokemon-name');
    expect(title.length).toBe(1);
  });

  test('se a Pokédex tem os botões de filtros', () => {
    renderWithRouter(<App />);
    const buttonLength = 7;
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    expect(filterButtons.length).toBe(buttonLength);

    // verificar se cada botão tem o nome de cada filtro.
    filterButtons.forEach((button, index) => {
      userEvent.click(button);
      const typeButton = screen.getByTestId('pokemon-type');
      expect(filterButtons[index].innerHTML).toBe(typeButton.innerHTML);
    });

    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(allBtn).toBeInTheDocument();
  });

  test('se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(allBtn).toBeInTheDocument();

    userEvent.click(allBtn);
    const verifyPokemonName = screen.getByTestId('pokemon-name');
    expect(verifyPokemonName).toBeInTheDocument();
  });
});
