import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testes do componente Pokedex', () => {
  it('A página deve conter um h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(title).toBeInTheDocument();
  });
  it(`Quando o botao "Próximo pokemon" for clicado
   apenas um pokémon deve aparecer por vez`, () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByTestId('next-pokemon');
    expect(nextButton).toBeInTheDocument();

    userEvent.click(nextButton);
    const pokemon = screen.getAllByText(/More details/i);
    expect(pokemon).toHaveLength(1);
  });
  it(`Deve ser exibido o próximo Pokémon da lista
   quando o botão "Próximo pokémon" é clicado`, () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByText('Próximo pokémon');
    userEvent.click(nextButton);
    const pokemon = screen.getByText(/Charmander/i);
    expect(pokemon).toBeInTheDocument();
  });
  it('A pokédex deve possuir os botões de filtro', () => {
    renderWithRouter(<App />);
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const numOfTypes = 7;
    expect(filterButtons).toHaveLength(numOfTypes);

    pokemons.forEach(({ type }) => {
      const typeButtons = screen.getByRole('button', { name: `${type}` });
      expect(typeButtons).toBeInTheDocument();
    });
  });
  it(`A Pokedéx deve mostrar os Pokémons sem filtros
   quando o botão All for clicado`, () => {
    renderWithRouter(<App />);
    const allTypeButton = screen.getByRole('button', { name: 'All' });
    userEvent.click(allTypeButton);

    const pokemon = screen.getByText(/Pikachu/i);
    expect(pokemon).toBeInTheDocument();

    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(nextButton);
    const nextPokemon = screen.getByText(/Charmander/i);
    expect(nextPokemon).toBeInTheDocument();
  });
});
