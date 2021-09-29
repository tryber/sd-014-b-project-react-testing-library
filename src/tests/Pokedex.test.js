import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

beforeEach(() => renderWithRouter(<App />));

describe('Testa o componente <Pokedex.js />', () => {
  test('Página contém um heading h2 com o texto Encountered pokémons', () => {
    const title = screen.getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(title).toBeInTheDocument();
  });

  test(`É exibido o próximo Pokémon da lista quando o botão Próximo 
    pokémon é clicado`, () => {
    const buttonNextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(buttonNextPokemon).toBeInTheDocument();
  });

  test('É mostrado apenas um Pokémon por vez', () => {
    const namePokemon = screen.getAllByTestId('pokemon-name');
    expect(namePokemon.length).toBe(1);
  });

  test('Pokédex tem os botões de filtro', () => {
    const NUM_OF_FILTERS = 7;
    const buttonFilter = screen.getAllByTestId('pokemon-type-button');
    expect(buttonFilter.length).toBe(NUM_OF_FILTERS);

    const buttonElectric = screen.getByRole('button', { name: 'Electric' });
    expect(buttonElectric).toBeInTheDocument();
  });

  test('Pokédex contém um botão para resetar o filtro', () => {
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();

    userEvent.click(buttonAll);

    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toHaveTextContent('Pikachu');
  });
});
