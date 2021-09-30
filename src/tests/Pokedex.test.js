import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { Pokedex } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Testing component Pokedex', () => {
  it('should have a heading "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const headingPokemon = screen.getByText('Encountered pokémons');
    expect(headingPokemon).toBeInTheDocument();
  });

  it('should have a button "Próximo Pokémon" and have a button "ALL"', () => {
    renderWithRouter(<App />);

    const btnNextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(btnNextPokemon).toBeInTheDocument();

    const btnAll = screen.getByRole('button', { name: 'All' });
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnNextPokemon);

    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnNextPokemon);

    const caterpie = screen.getByText('Caterpie');
    expect(caterpie).toBeInTheDocument();
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnNextPokemon);

    const ekans = screen.getByText('Ekans');
    expect(ekans).toBeInTheDocument();
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnNextPokemon);

    const alakazam = screen.getByText('Alakazam');
    expect(alakazam).toBeInTheDocument();
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnNextPokemon);

    const mew = screen.getByText('Mew');
    expect(mew).toBeInTheDocument();
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnNextPokemon);

    const rapidash = screen.getByText('Rapidash');
    expect(rapidash).toBeInTheDocument();
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnNextPokemon);

    const snorlax = screen.getByText('Snorlax');
    expect(snorlax).toBeInTheDocument();
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnNextPokemon);

    const dragonair = screen.getByText('Dragonair');
    expect(dragonair).toBeInTheDocument();
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnNextPokemon);

    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnNextPokemon);
  });

  it('should have a button "Próximo Pokémon', () => {
    renderWithRouter(<App />);

    const btnAll = screen.getByRole('button', { name: 'All' });
    expect(btnAll).toBeInTheDocument();

    const btnFire = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(btnFire);

    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();
    expect(btnAll).toBeInTheDocument();

    const btnNextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(btnNextPokemon).toBeInTheDocument();
    userEvent.click(btnNextPokemon);

    const rapidash = screen.getByText('Rapidash');
    expect(rapidash).toBeInTheDocument();
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnNextPokemon);

    expect(charmander).toBeInTheDocument();
    expect(btnAll).toBeInTheDocument();
  });

  it('should have just one button for each type of Pokemon', () => {
    renderWithRouter(<App />);

    const btnType = screen.getAllByTestId('pokemon-type-button');
    expect(btnType[0]).toBeInTheDocument();
    const SEVEN = 7;
    expect(btnType).toHaveLength(SEVEN);
    expect(btnType[0]).toHaveTextContent('Electric');
    expect(btnType[1]).toHaveTextContent('Fire');
    expect(btnType[2]).toHaveTextContent('Bug');
    expect(btnType[3]).toHaveTextContent('Poison');
    expect(btnType[4]).toHaveTextContent('Psychic');
    expect(btnType[5]).toHaveTextContent('Normal');
    expect(btnType[6]).toHaveTextContent('Dragon');
  });

  it('should have button "ALL"', () => {
    renderWithRouter(<App />);

    const btnAll = screen.getByRole('button', { name: 'All' });
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnAll);
  });
});
