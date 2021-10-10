import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../uteis/renderWithRouter';
import App from '../App';
import Pokemons from '../data';

describe('Testa o component Pokedex', () => {
  test('se página contém um heading h2 com o texto "Encountered pokémons".', () => {
    renderWithRouter(<App />);
    const titlePokedex = screen.getByRole('heading',
      { level: 2, name: 'Encountered pokémons' });
    expect(titlePokedex).toBeInTheDocument();
  });

  test('se existe um bottão com o texto "Próximo pokémon".', () => {
    renderWithRouter(<App />);
    const buttonNextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(buttonNextPokemon).toBeInTheDocument();
  });

  test(`se os próximos Pokémons da lista aparecem,
  um a um, ao clicar sucessivamente no botão`, () => {
    renderWithRouter(<App />);
    const buttonNextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(buttonNextPokemon).toBeInTheDocument();
    // Passo a passo para os proximos testes
    // 1.Pegar a lista de pokemons
    Pokemons.forEach((pokemon) => {
      const namePokemon = screen.getByTestId('pokemon-name');
      // 3. Após cada click verificar se o pokemon atual aparece na tela
      expect(namePokemon).toHaveTextContent(pokemon.name);
      // 2.Para cada pokemon da lista clicar no botão proximo botão
      userEvent.click(buttonNextPokemon);
    });
  });
});
