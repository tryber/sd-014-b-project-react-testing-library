import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const h2 = screen.getByRole('heading', { name: /Encountered pokémons/, level: 2 });
    expect(h2).toBeInTheDocument();
  });
  it(`Teste se é exibido o próximo Pokémon da lista 
      quando o botão Próximo pokémon é clicado`, () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(button).toBeInTheDocument();
    const allButton = screen.getByRole('button', { name: 'All' });
    userEvent.click(allButton);

    pokemons.forEach((pokemon, i) => {
      const name = screen.getByText(pokemon.name);
      expect(name).toBeInTheDocument();
      userEvent.click(button);

      if (i === pokemons.length - 1) {
        const pikachu = screen.getByText('Pikachu');
        expect(pikachu).toBeInTheDocument();
      }
    });
  });
  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);

    const pokemonCard = screen.getAllByText(/Average weight/);
    expect(pokemonCard.length).toEqual(1);
  });
  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const SEVEN = 7;
    const buttonList = screen.getAllByTestId('pokemon-type-button');
    expect(buttonList.length).toEqual(SEVEN);

    buttonList.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
  });
  it('O botão All precisa estar sempre visível', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
  });
  it('O texto do botão deve corresponder ao nome do tipo, ex. Psychic', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: 'Psychic' });
    userEvent.click(button);
    const type = screen.getByTestId('pokemon-type');
    expect(button).toHaveTextContent('Psychic');
    expect(type).toHaveTextContent('Psychic');
  });
});
