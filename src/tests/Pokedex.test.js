import React from 'react';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';

describe('Test Pokedex', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const getText = screen.getByRole('heading', {
      level: 2,
      value: 'Encountered pokémons',
    });
    expect(getText).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon ao clicar no botão Próximo pokémon', () => {
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    pokemons.forEach((pokemon, index) => {
      // encontrar o botão na página com texto Próximo pokémon
      const getButton = screen.getByRole('button', { name: 'Próximo pokémon' });
      // verifica pikachu
      const namePokemon = screen.getByTestId('pokemon-name');
      expect(namePokemon.textContent).toBe(pokemon.name);
      // faz o if
      if (index === pokemons.length - 1) {
        expect(namePokemon.textContent).toBe('Dragonair');
        // clicar
        userEvent.click(getButton);
        // conferir se é pikachu
        expect(namePokemon.textContent).toBe('Pikachu');
      } else {
        userEvent.click(getButton);
      }
    });
  });
  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const oneTime = screen.getAllByTestId('pokemon-weight');
    expect(oneTime.length).toBe(1);
  });
  test('Teste se a Pokédex tem os botões de filtro', () => {
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const number = 7;
    const typePokemonButton = screen.getAllByTestId('pokemon-type-button');
    expect(typePokemonButton.length).toBe(number);
    // A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;
    typePokemonButton.forEach((button, index) => {
      userEvent.click(button);
      const textType = screen.getByTestId('pokemon-type');
      expect(typePokemonButton[index].textContent).toBe(textType.textContent);
    });
    const buttonAll = screen.getByText('All');
    expect(buttonAll).toBeInTheDocument();
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const getButtonAll = screen.getByText('All');
    expect(getButtonAll.textContent).toBe('All');

    userEvent.click(getButtonAll);
    const getPokemonName = screen.getByTestId('pokemon-name');
    expect(getPokemonName.textContent).toBe('Pikachu');
  });
});
