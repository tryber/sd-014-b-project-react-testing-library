import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente <Pokedex.js />', () => {
  it('Verifica se a página contém um heading com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const pokedexHeading = screen.getByRole('heading', { level: 2 });
    expect(pokedexHeading).toBeInTheDocument();
    expect(pokedexHeading).toHaveTextContent('Encountered pokémons');
  });
  it('Verifica se o próximo Pokémon é exibido quando o botão próximo é clicado', () => {
    renderWithRouter(<App />);

    // O primeiro pokémon deve ser mostrado ao clicar no botão se estiver no último da lista
    const firstPokemonOnTheList = screen.getByText('Pikachu');
    expect(firstPokemonOnTheList).toBeInTheDocument();

    const buttonNextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(buttonNextPokemon);
    // Lembrar de acessar o segundo poḱémon e testar quando acessar o terceiro
    const secondPokemonOnTheList = screen.getByText('Charmander');
    expect(secondPokemonOnTheList).toBeInTheDocument();
    userEvent.click(buttonNextPokemon);

    const thirdPokemonOnTheList = screen.getByText('Caterpie');
    expect(thirdPokemonOnTheList).toBeInTheDocument();
  });

  it('Verifica se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokedexList = screen.getAllByTestId('pokemon-name');
    expect(pokedexList.length).toBe(1);
  });

  it('Verifica se a Podedex possui botões de filtro', () => {
    renderWithRouter(<App />);

    const pokemonTypesInPokedex = [
      'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon']; // Referência dos testes de Thyara Norato
    const buttonType = screen.getAllByTestId('pokemon-type-button');
    expect(buttonType.length).toBe(pokemonTypesInPokedex.length);

    buttonType.map((button, index) => {
      expect(button).toBeInTheDocument();
      return expect(buttonType[index]).toHaveTextContent(pokemonTypesInPokedex[index]);
    });

    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
  });

  it('Verifica se a Pokédex tem um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
    expect(buttonAll).toHaveTextContent('All');
    userEvent.click(buttonAll);
  });
});
