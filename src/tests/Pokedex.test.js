import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderRouter from './renderRouter';
// import Pokedex from '../components/Pokedex';
import App from '../App';

test('', () => {});
describe('Teste o componente <Pokedex.js />', () => {
  beforeEach(() => {
    renderRouter(<App />);
  });

  test('Página contém um heading h2 com o texto Encountered pokémons', () => {
    const heading = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(heading).toBeInTheDocument();
  });

  test('Exibe próximo Pokémon quando o botão Próximo é clicado', () => {
    // Acessar e testar 1º pokemon:
    const firstCard = screen.getByText(/Pikachu/i);
    expect(firstCard).toBeInTheDocument();
    // Acesso, clique e teste ao próximo:
    const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(buttonNext);
    const secondCard = screen.getByText(/Charmander/i);
    expect(secondCard).toBeInTheDocument();
    userEvent.click(buttonNext);
    // teste atual
    const thirdCard = screen.getByText(/Caterpie/i);
    expect(thirdCard).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    // Testa que há só 1 nome
    const pokemonList = screen.getAllByTestId('pokemon-name');
    expect(pokemonList.length).toBe(1);
  });

  test('Teste se a Pokédex tem botões de filtro.', () => {
    const filterBtn = screen.getAllByTestId('pokemon-type-button');
    const arrayTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic',
      'Normal', 'Dragon'];
    expect(filterBtn.length).toBe(arrayTypes.length);
    filterBtn.forEach((button, index) => {
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(arrayTypes[index]);
    });
    expect(screen.getByRole('button', { name: /All/i })).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro.', () => {
    const allPokeBtn = screen.getByRole('button', { name: /All/i });
    expect(allPokeBtn).toBeInTheDocument();
    expect(allPokeBtn).toHaveTextContent('All');
    userEvent.click(allPokeBtn);
  });
});
