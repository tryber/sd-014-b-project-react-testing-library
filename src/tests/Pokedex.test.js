import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../../helper/renderWithRouter';
import App from '../App';

const assert = require('assert');

describe('Testa o componente Pokedex.js', () => {
  test('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const title = screen.getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(title).toBeInTheDocument();
  });
  test(`Teste se é exibido o próximo Pokémon da lista
   quando o botão Próximo pokémon é clicado.`, () => {
    renderWithRouter(<App />);

    const button = screen.getByText('Próximo pokémon');

    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();

    fireEvent.click(button);

    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();

    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    const afterLastPokemon = screen.getByText('Pikachu');
    expect(afterLastPokemon).toBeInTheDocument();
  });
  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);

    const detailsTextPokemonOne = screen.getAllByText('More details');
    expect(detailsTextPokemonOne.length).toBe(1);
  });
  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);

    const allPokemonsButton = screen.getByText('All');
    fireEvent.click(allPokemonsButton);
    expect(allPokemonsButton).toBeInTheDocument();

    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    assert.strictEqual(filterButtons[0].textContent, 'Electric');
    assert.strictEqual(filterButtons[1].textContent, 'Fire');
    assert.strictEqual(filterButtons[2].textContent, 'Bug');
    assert.strictEqual(filterButtons[3].textContent, 'Poison');
    assert.strictEqual(filterButtons[4].textContent, 'Psychic');
    assert.strictEqual(filterButtons[5].textContent, 'Normal');
    assert.strictEqual(filterButtons[6].textContent, 'Dragon');

    fireEvent.click(filterButtons[2]);
    const caterpie = screen.getByText('Caterpie');
    expect(caterpie).toBeInTheDocument();

    const allPokemonsButtonTest2 = screen.getByText('All');
    expect(allPokemonsButtonTest2).toBeInTheDocument();
  });
});
