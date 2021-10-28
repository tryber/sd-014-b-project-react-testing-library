import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';

const nextButton = 'next-pokemon';
const pokemonName = 'pokemon-name';

describe('if Pokedex page works', () => {
  test('if page has an h2 with text', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const encounteredPokemons = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(encounteredPokemons).toBeInTheDocument();
  });
  test('if the next pokemon is shown when the button is clicked', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const buttonNext = screen.getByTestId(nextButton);
    expect(buttonNext).toBeInTheDocument();
    userEvent.click(buttonNext);
    const nextPokemonImage = screen.getByRole('img');
    expect(nextPokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
  });
  test('if it is shown one pokemon at a time', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const pokemon = screen.getAllByRole('img');
    expect(pokemon.length).toBe(1);
  });
  test('if has filter buttons in the page and if it works', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const SEVEN = 7;
    expect(filterButtons).toHaveLength(SEVEN);

    const all = screen.getByText('All');
    const electric = screen.getByRole('button', { name: 'Electric' });
    const fire = screen.getByRole('button', { name: 'Fire' });
    const bug = screen.getByRole('button', { name: 'Bug' });

    userEvent.click(electric);

    const pokemonType = 'pokemon-type';
    const pikachuName = screen.getByTestId(pokemonName, {
      name: 'Pikachu',
    });
    const electricType = screen.getByTestId(pokemonType, {
      name: 'Electric',
    });
    expect(pikachuName && electricType && all).toBeInTheDocument();
    userEvent.click(fire);
    const charmanderName = screen.getByTestId(pokemonName, {
      name: 'Charmander',
    });
    const fireType = screen.getByTestId(pokemonType, {
      name: 'Fire',
    });
    expect(charmanderName && fireType && all).toBeInTheDocument();
    userEvent.click(bug);
    const caterpieName = screen.getByTestId(pokemonName, {
      name: 'Caterpie',
    });
    const bugType = screen.getByTestId(pokemonType, {
      name: 'Bug',
    });
    expect(caterpieName && bugType && all).toBeInTheDocument();
  });
});
describe('test next button', () => {
  test('if it works', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const buttonNext = screen.getByTestId(nextButton);
    userEvent.click(buttonNext);

    const charmanderName = screen.getByTestId(pokemonName, {
      name: 'Charmander',
    });
    expect(charmanderName).toBeInTheDocument();
    userEvent.click(buttonNext);
    const caterpieName = screen.getByTestId(pokemonName, {
      name: 'Caterpie',
    });
    expect(caterpieName).toBeInTheDocument();
    userEvent.click(buttonNext);
    const ekansName = screen.getByTestId(pokemonName, {
      name: 'Ekans',
    });
    expect(ekansName).toBeInTheDocument();
    userEvent.click(buttonNext);
    const alakazanName = screen.getByTestId(pokemonName, {
      name: 'Alakazan',
    });
    expect(alakazanName).toBeInTheDocument();
    userEvent.click(buttonNext);
    const mewName = screen.getByTestId(pokemonName, {
      name: 'Mew',
    });
    expect(mewName).toBeInTheDocument();
    userEvent.click(buttonNext);
    const rapidashName = screen.getByTestId(pokemonName, {
      name: 'Rapidash',
    });
    expect(rapidashName).toBeInTheDocument();
    userEvent.click(buttonNext);
    const snorlaxName = screen.getByTestId(pokemonName, {
      name: 'Snorlax',
    });
    expect(snorlaxName).toBeInTheDocument();
    userEvent.click(buttonNext);
    const dragonairName = screen.getByTestId(pokemonName, {
      name: 'Dragonair',
    });
    expect(dragonairName).toBeInTheDocument();
    userEvent.click(buttonNext);
    const pikachuName = screen.getByTestId(pokemonName, {
      name: 'Pikachu',
    });
    expect(pikachuName).toBeInTheDocument();
  });
});
describe('testing reset button', () => {
  test('if reset button works', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const buttonNext = screen.getByTestId(nextButton);
    const resetButton = screen.getByRole('button', {
      name: 'All',
    });
    expect(resetButton).toBeInTheDocument();
    userEvent.click(resetButton);
    const electric = screen.getByRole('button', {
      name: 'Electric',
    });
    const fire = screen.getByRole('button', {
      name: 'Fire',
    });
    const bug = screen.getByRole('button', {
      name: 'Bug',
    });
    const pokemonType = 'pokemon-type';
    userEvent.click(electric);
    const pikachuName = screen.getByTestId(pokemonName, {
      name: 'Pikachu',
    });
    const electricType = screen.getByTestId(pokemonType, {
      name: 'Electric',
    });
    expect(pikachuName && electricType && resetButton).toBeInTheDocument();
    userEvent.click(fire);
    const charmanderName = screen.getByTestId(pokemonName, { name: 'Charmander' });
    const fireType = screen.getByTestId(pokemonType, { name: 'Fire' });
    expect(charmanderName && fireType && resetButton).toBeInTheDocument();
    userEvent.click(bug);
    const caterpieName = screen.getByTestId(pokemonName, { name: 'Caterpie' });
    const bugType = screen.getByTestId(pokemonType, { name: 'Bug' });
    expect(caterpieName && bugType && resetButton).toBeInTheDocument();
    history.push('/');
    userEvent.click(buttonNext);
    expect(charmanderName).toBeInTheDocument();
    userEvent.click(buttonNext);
    expect(caterpieName).toBeInTheDocument();
  });
});
