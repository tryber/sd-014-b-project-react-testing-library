import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';
import pokemons from '../data';

describe('Requisito 5 - Testa o componente <Pokedex.js />', () => {
  it('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const expectedHeading = screen.getByRole(
      'heading', {
        level: 2,
        name: 'Encountered pokémons',
      },
    );
    expect(expectedHeading).toBeInTheDocument();
  });

  it('Testa se apenas um pokémon é exibido ao clicar em Próximo Pokémon', () => {
    renderWithRouter(<App />);
    const expectedClickButton = screen.getByRole(
      'button', {
        name: 'Próximo pokémon',
      },
    );

    fireEvent.click(expectedClickButton);
    expect(expectedClickButton).toBeInTheDocument();

    expect(screen.getByText(/charmander/i)).toBeInTheDocument();

    const pokemonsOnScreen = screen.getAllByText(/Average weight/i);
    const { length } = pokemonsOnScreen;
    expect(length).toBe(1);
  });

  test('Verifica os botões de filtro', () => {
    const buttonLength = 7;
    renderWithRouter(<App />);
    const expectedButtons = screen.getAllByTestId('pokemon-type-button');
    expect(expectedButtons.length).toBe(buttonLength);
    const expectedAllButons = screen.getByRole(
      'button', {
        name: 'All',
      },
    );
    expect(expectedAllButons).toBeInTheDocument();
    pokemons.forEach((pokemon) => {
      const expectedButton = screen.getByRole(
        'button', {
          name: `${pokemon.type}`,
        },
      );
      expect(expectedButton).toBeInTheDocument();
    });
  });

  test('Ao carregar a página, o botão All deve estar selecionado', () => {
    renderWithRouter(<App />);
    const expectedAllButton = screen.getByRole(
      'button', {
        name: 'All',
      },
    );
    expect(expectedAllButton).toBeInTheDocument();
    fireEvent.click(expectedAllButton);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
