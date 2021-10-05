import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Testes requisito 5, teste do component Pokedex', () => {
  test('Testa secontem um heading h2 com o texto Encountered pokemons', () => {
    renderWithRouter(<App />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(heading).toBeInTheDocument();
  });

  test('Testa se aparece o novo pokemon quando o botao é clicado', () => {
    renderWithRouter(<App />);

    const buttom = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(buttom).toBeInTheDocument();

    userEvent.click(buttom);
  });

  test('Testa se só um pokemon é exibido por vez', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getAllByText('More details');
    expect(pokemonName.length).toBe(1);
  });

  test('Testa se a pokedex possui um filtro de tipos de pokemon', () => {
    renderWithRouter(<App />);

    const pokemonType = screen.getAllByTestId('pokemon-type-button');
    expect(pokemonType[0]).toBeInTheDocument();
    const seven = 7;

    expect(pokemonType).toHaveLength(seven);
    expect(pokemonType[0]).toHaveTextContent('Electric');
    expect(pokemonType[1]).toHaveTextContent('Fire');
    expect(pokemonType[2]).toHaveTextContent('Bug');
    expect(pokemonType[3]).toHaveTextContent('Poison');
    expect(pokemonType[4]).toHaveTextContent('Psychic');
    expect(pokemonType[5]).toHaveTextContent('Normal');
    expect(pokemonType[6]).toHaveTextContent('Dragon');
  });

  test('Testa se existe um botao para resetar os filtros', () => {
    renderWithRouter(<App />);

    const resetButton = screen.getByRole('button', { name: 'All' });
    expect(resetButton).toBeInTheDocument();

    userEvent.click(resetButton);
  });
});
