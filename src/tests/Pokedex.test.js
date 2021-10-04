import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('5. Teste o componente <Pokedex.js />', () => {
  const numberSeven = 7;

  it('Teste se tem h2', () => {
    render(<Router><App /></Router>);
    const h2 = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(h2).toBeInTheDocument();
  });

  it('Teste botão próxiomo pokemon', () => {
    render(<Router><App /></Router>);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();

    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(nextButton).toBeInTheDocument();
    userEvent.click(nextButton);

    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();

    for (let i = 1; i <= numberSeven; i += 1) userEvent.click(nextButton);
    expect(pikachu).toBeInTheDocument();
  });

  it('Apenas um pokemon por vez', () => {
    render(<Router><App /></Router>);

    for (let i = 1; i <= numberSeven; i += 1) {
      const arrayPokemons = screen.getAllByTestId('pokemon-name');
      expect(arrayPokemons).toHaveLength(1);
    }
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    render(<Router><App /></Router>);

    const pokTypes = [
      'All',
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    for (let i = 0; i < numberSeven; i += 1) {
      if (pokTypes[i] === 'All') {
        const pokemon = screen.getByTestId('pokemon-type');
        expect(pokemon).toHaveTextContent('Electric');
      } else {
        const typeBtn = screen.getByRole('button', {
          name: pokTypes[i],
        });
        expect(typeBtn).toBeInTheDocument();
        userEvent.click(typeBtn);

        const pokemon = screen.getByTestId('pokemon-type');
        expect(pokemon).toHaveTextContent(pokTypes[i]);
      }
    }

    const allBtn = screen.getByRole('button', {
      name: /all/i,
    });
    expect(allBtn).toBeInTheDocument();

    const testIdBtns = screen.getAllByTestId('pokemon-type-button');
    expect(testIdBtns).toHaveLength(numberSeven);

    userEvent.click(allBtn);

    const pikachu = screen.getByTestId('pokemon-name');
    expect(pikachu).toHaveTextContent(/pikachu/i);
  });
});
