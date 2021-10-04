import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  it('se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const titleText = screen.getByRole(
      'heading', { level: 2, name: /Encountered pokémons/i },
    );
    expect(titleText).toBeInTheDocument();
  });
  it(`se é exibido o próximo Pokémon da lista
  quando o botão Próximo pokémon é clicado.`, () => {
    renderWithRouter(<App />);
    const buttonInThePage = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(buttonInThePage).toBeInTheDocument();
    userEvent.click(buttonInThePage);
    const pokemon2 = screen.getByRole('img', { name: /Charmander sprite/i });
    expect(pokemon2).toBeInTheDocument();
    userEvent.click(buttonInThePage);
    const pokemon3 = screen.getByRole('img', { name: /Caterpie sprite/i });
    expect(pokemon3).toBeInTheDocument();
    const seven = 7;
    for (let index = 0; index < seven; index += 1) {
      userEvent.click(buttonInThePage);
    }
    const pokemon1 = screen.getByRole('img', { name: /Pikachu sprite/i });
    expect(pokemon1).toBeInTheDocument();
  });
  it('se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('button', { name: /Electric/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Fire/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Bug/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Poison/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Psychic/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Normal/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Dragon/i })).toBeInTheDocument();
  });
  it('se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonReset = screen.getByRole('button', { name: /All/i });
    expect(buttonReset).toBeInTheDocument();
    userEvent.click(buttonReset);
    const pikachu = screen.getByTestId('pokemon-name');
    expect(pikachu.innerHTML).toBe('Pikachu');
    expect(screen.getByRole('button', { name: /Electric/i })).toBeInTheDocument();
    const seven = 7;
    expect(screen.getAllByTestId('pokemon-type-button').length).toBe(seven);
  });
});
