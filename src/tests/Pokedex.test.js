import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testa o componente Pokedex', () => {
  it('contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const heading2 = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(heading2).toBeInTheDocument();
  });
  it('teste se é exibido o próximo pokemon da lista', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextButton);
    const pokemon = screen.getByText(/charmander/i);
    expect(pokemon).toBeInTheDocument();
  });
  it('teste se é mostrado um pokemon por vez', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId(/pokemon-name/i);
    expect(pokemon.length).toBe(1);
  });
  it('existir um botão de filtragem para cada tipo de Pokémon, sem repetição', () => {
    renderWithRouter(<App />);
    const allButtons = screen.getAllByTestId(/pokemon-type-button/i);
    const numberOfPokemonTypes = 7;
    expect(allButtons.length).toBe(numberOfPokemonTypes);
    const electric = screen.getByRole('button', { name: /electric/i });
    const poison = screen.getByRole('button', { name: /poison/i });
    const bug = screen.getByRole('button', { name: /bug/i });
    const psychic = screen.getByRole('button', { name: /psychic/i });
    const fire = screen.getByRole('button', { name: /fire/i });
    const normal = screen.getByRole('button', { name: /normal/i });
    const dragon = screen.getByRole('button', { name: /dragon/i });
    const all = screen.getByRole('button', { name: /all/i });
    expect(electric).toBeInTheDocument();
    expect(poison).toBeInTheDocument();
    expect(bug).toBeInTheDocument();
    expect(psychic).toBeInTheDocument();
    expect(fire).toBeInTheDocument();
    expect(normal).toBeInTheDocument();
    expect(dragon).toBeInTheDocument();
    expect(all).toBeInTheDocument();
  });
  it('testa se o botão All funciona', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: 'All' });
    userEvent.click(buttonAll);
    const nameOfPokemon = screen.getByText(/pikachu/i);
    expect(nameOfPokemon).toBeInTheDocument();
  });
});
