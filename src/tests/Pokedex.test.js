import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const nameTestId = 'pokemon-name';
const nextButtonTestId = 'next-pokemon';
const AMOUNT_OF_POKEMONS = 9;

describe('05 - Teste o componente <Pokedex.js />', () => {
  test('a) Se a página contém um heading h2 com o texto Encountered pokémons',
    () => {
      renderWithRouter(<App />);

      const pokedexHeading = screen.getByRole('heading',
        { level: 2, name: 'Encountered pokémons' });
      expect(pokedexHeading).toBeInTheDocument();
    });

  test('b) Se é exibido o próximo da lista quando o botão é clicado', () => {
    renderWithRouter(<App />);

    const listOfNames = [screen.getByTestId(nameTestId).innerHTML];
    const nextPokemonButton = screen.getByTestId(nextButtonTestId);
    expect(nextPokemonButton).toHaveTextContent('Próximo pokémon');

    for (let index = 1; index <= AMOUNT_OF_POKEMONS; index += 1) {
      userEvent.click(nextPokemonButton);
      const pokemonName = screen.getByTestId(nameTestId).innerHTML;
      if (index < AMOUNT_OF_POKEMONS) {
        listOfNames.push(pokemonName);
        expect(listOfNames[listOfNames.length - 1])
          .not.toBe(listOfNames[listOfNames.length - 2]);
      } else {
        expect(pokemonName).toBe(listOfNames[0]);
      }
    }
  });

  test('c) Se é é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const nextPokemonButton = screen.getByTestId(nextButtonTestId);
    expect(screen.getAllByTestId(nameTestId).length).toBe(1);

    for (let index = 2; index <= AMOUNT_OF_POKEMONS; index += 1) {
      userEvent.click(nextPokemonButton);
      expect(screen.getAllByTestId(nameTestId).length).toBe(1);
    }
  });

  test('d) Se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const listOfTypes = [];
    const listOfTypeButtons = screen.getAllByTestId('pokemon-type-button');

    listOfTypeButtons.forEach((typeButton) => {
      userEvent.click(typeButton);
      listOfTypes.push(typeButton.innerHTML);
      expect(screen.getByText('All')).toBeInTheDocument();
      expect(typeButton.innerHTML).toBe(screen.getByTestId('pokemon-type').innerHTML);
      if (!screen.getByTestId(nextButtonTestId).disabled) {
        userEvent.click(screen.getByTestId(nextButtonTestId));
        expect(typeButton.innerHTML).toBe(screen.getByTestId('pokemon-type').innerHTML);
      }
    });

    expect(listOfTypes.length).toBe(listOfTypeButtons.length);
  });

  test('e) Se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const filterResetButton = screen.getByRole('button', { name: 'All' });
    expect(filterResetButton).toBeInTheDocument();

    const nextPokemonButton = screen.getByTestId(nextButtonTestId);

    const testFilter = () => {
      const listOfPokemons = [];

      for (let index = 1; index <= AMOUNT_OF_POKEMONS; index += 1) {
        listOfPokemons.push(screen.getByTestId(nameTestId).innerHTML);
        userEvent.click(nextPokemonButton);
      }

      expect(listOfPokemons.length).toBe(AMOUNT_OF_POKEMONS);
    };

    testFilter();

    userEvent.click(filterResetButton);
    testFilter();
  });
});
