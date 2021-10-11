import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

describe('Verifica o componente Pokedex', () => {
  test('Verifica se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const titleH2 = screen.getByRole('heading', {
      level: 2, name: 'Encountered pokémons'
    });
    expect(titleH2).toBeInTheDocument();
  });

  test('Verifica se é exibido o próximo Pokémon da lista', () => {
    renderWithRouter(<App />);
    const nextPokemon = screen.getByText(/Próximo pokémon/);
    expect(nextPokemon).toBeInTheDocument();
  });

  test('Verifica se os pokemons são mostrados um a um', () => {
    renderWithRouter(<App />);
    const showOneaOne = screen.getAllByTestId('pokemon-name');
    expect(showOneaOne.length).toStrictEqual(1);
  });

  test('Verifica se existe um botão de filtro para cada tipo', () => {
    renderWithRouter(<App />);
    const filterButton = screen.getAllByTestId('pokemon-type-button');
    const pokemonsTypes = 7;
    expect(filterButton.length).toStrictEqual(pokemonsTypes);
  });

  test('Verifica se ao clicar no botao o texto correponde ao tipo', () => {
    renderWithRouter(<App />);
    const pokemonFire = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(pokemonFire);
    const charmander = screen.getByText(/Charmander/);
    expect(charmander).toBeInTheDocument();
  });
});
