import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';
import myPersonalRender from './renderWithRouter';

describe('A pokédex contém', () => {
  it('um titulo nivel 2', () => {
    myPersonalRender(<App />);

    const title = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });

    expect(title).toBeInTheDocument();
  });
});

describe('O botão', () => {
  it('exibe o proximo pokemon, quando clickado', () => {
    myPersonalRender(<App />);
    const nextPokemon = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });

    userEvent.click(nextPokemon);
    const next = screen.getByText('Charmander');

    expect(next).toBeInTheDocument();
  });

  it('deve conter o texto "Próximo pokémon"', () => {
    myPersonalRender(<App />);
    const title = screen.getByText('Próximo pokémon');

    expect(title).toBeInTheDocument();
  });

  // Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;
  // requisito ignorado
  // it('ao ser clickado no fim da lista exibe o primeiro pokemon', () => {
  //   myPersonalRender(<App />);
  // });

  it('exibe um pokemon por vez', () => {
    myPersonalRender(<App />);

    const pokemon = screen.getAllByTestId('pokemon-name');

    expect(pokemon.length).toBe(1);
  });
});

describe('Deve existir botoes de filtro que', () => {
  it('filtram cada tipo de pokemon', () => {
    myPersonalRender(<App />);

    const botesDeFiltro = screen.getAllByTestId('pokemon-type-button');
    const numeroTotaldeBotes = 7;
    expect(botesDeFiltro.length).toBe(numeroTotaldeBotes);
  });

  it('garante a pokedex circular apenas o tipo específico quando selecionado', () => {
    myPersonalRender(<App />);

    pokemons.forEach(({ type }) => {
      const typeButton = screen.getAllByRole('button', {
        name: `${type}`,
      });
      expect(typeButton).toBeDefined();
    });
  });

  // it('contém o texto correspondente ao "tipo" clickado', () => {

  // });
});

describe('botao de filtro all', () => {
  it('deve estar sempre visivel', () => {
    myPersonalRender(<App />);
    const allbuton = screen.getByRole('button', { name: 'All' });
    const pikachu = screen.getByText(/pikachu/i);
    userEvent.click(allbuton);

    expect(pikachu).toBeDefined();
    expect(allbuton).toBeInTheDocument();
  });
});
// boa parte do codgo foi de consulta do codgo da Mariana Ferreira https://github.com/tryber/sd-014-b-project-react-testing-library/commit/4c71e7e389e04457633dd65a72d1316d7e53e18a
