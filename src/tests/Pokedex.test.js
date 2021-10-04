import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando componente Pokedex.js', () => {
  test('se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const tituloH2 = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(tituloH2).toBeInTheDocument();
  });

  test('se é exibido o botão próximo Pokémon da lista', () => {
    renderWithRouter(<App />);
    const botaoProximo = screen.getByText(/Próximo pokémon/);
    expect(botaoProximo).toBeInTheDocument();
  });

  test('se os pokemons são mostrados um a um', () => {
    renderWithRouter(<App />);
    const nomePokemon = screen.getAllByTestId('pokemon-name');
    expect(nomePokemon.length).toStrictEqual(1);
  });

  test('se a Pokédex tem os botões de filtro para cada tipo', () => {
    renderWithRouter(<App />);
    const botaoTipo = screen.getAllByTestId('pokemon-type-button');
    const tiposPokemons = 7;
    expect(botaoTipo.length).toStrictEqual(tiposPokemons);
  });

  test('se ao clicar no botao Fire, aparece o pokemon de fogo', () => {
    renderWithRouter(<App />);
    const pokemonFogo = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(pokemonFogo);
    const charmander = screen.getByText(/Charmander/);
    expect(charmander).toBeInTheDocument();
  });
});
