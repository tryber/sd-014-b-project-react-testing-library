import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../uteis/renderWithRouter';
import App from '../App';
// import Pokemons from '../data';

describe('Testa o component Pokedex', () => {
  test('se página contém um heading h2 com o texto "Encountered pokémons".', () => {
    renderWithRouter(<App />);
    const titlePokedex = screen.getByRole('heading',
      { level: 2, name: 'Encountered pokémons' });
    expect(titlePokedex).toBeInTheDocument();
  });

  test(`se é exibido o próximo Pokémon da lista quando o
  "botão Próximo pokémon" é clicado.`, () => {
    renderWithRouter(<App />);
    const buttonNextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(buttonNextPokemon);
    expect(buttonNextPokemon).toBeInTheDocument();
    // // Passo a passo para os proximos testes
    // // 1.Pegar a lista de pokemons
    // Pokemons.forEach((pokemon) => {
    //   console.log(pokemon.name);
    // });
    // // 2.Para cada pokemon da lista clicar no botão proximo botão
    // // 3. Após cada click verificar se o pokemon atual aparece na tela
    // // 4. Testar de existe mais de um role link com o nome "More details" na tela
  });
});
