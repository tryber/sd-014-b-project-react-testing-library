import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('5 - Testa o componente Pokedex.js ', () => {
  test('Verifica se a página contém um h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const elementEncounteredPokemon = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(elementEncounteredPokemon).toBeInTheDocument();
  });

  test('Verifica se exibe Pokémon da lista quando clicado botão Próximo pokémon', () => {
    renderWithRouter(<App />);

    const buttonProximoPokemon = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(buttonProximoPokemon).toBeInTheDocument();

    userEvent.click(buttonProximoPokemon);

    const pokemonAtual = screen.getByTestId('pokemon-name');
    expect(pokemonAtual).toHaveTextContent('Charmander');
  });

  test('Verifica se é mostrado na página apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);

    const pokemonRenderPage = screen.getAllByTestId('pokemon-name');
    expect(pokemonRenderPage).toHaveLength(1);
  });

  test('Verifica se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const buttonFilterPokemons = screen.getAllByTestId('pokemon-type-button');

    userEvent.click(buttonFilterPokemons[1]);
    const filterTypePokemon = screen.getByTestId('pokemon-type');
    expect(filterTypePokemon.innerHTML).toBe(buttonFilterPokemons[1].innerHTML);
  });

  test('Verifica se a Pokédex tem um botão para resetar filtro', () => {
    renderWithRouter(<App />);

    const buttonResetFilter = screen.getByRole('button', {
      name: /All/i,
    });

    expect(buttonResetFilter).toBeInTheDocument();
    userEvent.click(buttonResetFilter);
  });
});
