import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Requisito 05', () => {
  it('Contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const header = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(header).toBeInTheDocument();
  });
  it('É exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    renderWithRouter(<App />);
    const nextPokemonButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(nextPokemonButton).toBeInTheDocument();
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName.textContent).toBe('Pikachu');
    userEvent.click(nextPokemonButton);
    expect(pokemonName.textContent).toBe('Charmander');
  });
  it('É exibido apenas um Pokémon por vez ao clicar sucessivamente no botão', () => {
    renderWithRouter(<App />);
    const arrayOfPokemons = screen.getAllByTestId('pokemon-name');
    expect(arrayOfPokemons.length).toBe(1);
  });
  it('Contém botões de filtro', () => {
    renderWithRouter(<App />);
    const buttonType = screen.getAllByTestId('pokemon-type-button');
    buttonType.forEach((filters) => {
      expect(filters).toBeInTheDocument();
    });
    const nextPokemonButton = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(nextPokemonButton).toBeInTheDocument();
    const typeButton = screen.getByTestId('pokemon-type');
    const fireButton = screen.getByRole('button', { name: 'Fire' });
    const eletricButton = screen.getByRole('button', { name: 'Electric' });
    userEvent.click(fireButton);
    expect(typeButton.textContent).toBe('Fire');
    userEvent.click(eletricButton);
    expect(typeButton.textContent).toBe('Electric');
  });
  it('Contém botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const resetButton = screen.getByRole('button', { name: 'All' });
    expect(resetButton).toBeInTheDocument();
    userEvent.click(resetButton);
    const pokemonName = screen.getByText('Pikachu');
    expect(pokemonName).toBeInTheDocument();
  });
});
