import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import RouterRender from '../components/RouterRender';
import App from '../App';
import pokemons from '../data';

describe('Testing the Pokedex.js component', () => {
  it('should contain a h2 heading with "Encountered pokémons" text', () => {
    RouterRender(<App />);
    const title = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });

    expect(title).toBeInTheDocument();
  });

  it(`should show the next pokémon when the "Próximo pokémon" 
  button is clicked`, () => {
    RouterRender(<App />);

    const nextPokemonButton = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(nextPokemonButton).toBeInTheDocument();

    fireEvent.click(nextPokemonButton);

    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
  });

  it('should show only one pokemon at a time', () => {
    RouterRender(<App />);

    const renderPokemons = screen.getAllByTestId('pokemon-name');

    expect(renderPokemons.length).toBe(1);
  });

  it('should render filter buttons in the Pokédex', () => {
    const BUTTONS_LENGTH = 7;
    RouterRender(<App />);

    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();

    const pokemonsTypeButtons = screen.getAllByTestId('pokemon-type-button');
    expect(pokemonsTypeButtons.length).toBe(BUTTONS_LENGTH);

    pokemons.forEach(({ type }) => {
      const typeButton = screen.getByRole('button', { name: `${type}` });
      expect(typeButton).toBeInTheDocument();
    });
  });

  it('should have a button to reset the filters', () => {
    RouterRender(<App />);

    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();

    fireEvent.click(allButton);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
