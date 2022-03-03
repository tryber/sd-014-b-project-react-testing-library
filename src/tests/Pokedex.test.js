import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testing if <Pokedex /> is rendering the correct information', () => {
  it('should render a <h2> with the text "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });

    expect(title).toBeInTheDocument();
  });

  it(`should render the next pokémon when "Próximo pokémon" 
  button is clicked`, () => {
    renderWithRouter(<App />);

    const nextPokemonButton = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(nextPokemonButton).toBeInTheDocument();

    fireEvent.click(nextPokemonButton);

    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
  });

  it('should render one pokemon at a time', () => {
    renderWithRouter(<App />);

    const renderPokemons = screen.getAllByTestId('pokemon-name');

    expect(renderPokemons.length).toBe(1);
  });

  it('should render filter buttons in the Pokédex', () => {
    const FILTERS = 7;
    renderWithRouter(<App />);

    const pokemonsTypeButtons = screen.getAllByTestId('pokemon-type-button');
    expect(pokemonsTypeButtons.length).toBe(FILTERS);

    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();

    /* Função retirada do repositório do Glauco Lomenha */
    pokemons.forEach(({ type }) => {
      const typeButton = screen.getByRole('button', { name: `${type}` });
      expect(typeButton).toBeInTheDocument();
    });
  });

  it('should reset all filters and show Pikachu as default', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();

    fireEvent.click(allButton);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');
  });
});
