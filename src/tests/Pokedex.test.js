import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';

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
    const buttonNext = screen.getByTestId('next-pokemon');
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
    const all = screen.getByRole('button', {
      name: 'All',
    });
    const electric = screen.getByRole('button', {
      name: 'Electric',
    });
    const fire = screen.getByRole('button', {
      name: 'Fire',
    });
    const bug = screen.getByRole('button', {
      name: 'Bug',
    });
    const poison = screen.getByRole('button', {
      name: 'Poison',
    });
    const psychic = screen.getByRole('button', {
      name: 'Psychic',
    });
    const normal = screen.getByRole('button', {
      name: 'Normal',
    });
    const dragon = screen.getByRole('button', {
      name: 'Dragon',
    });
    expect(all).toBeInTheDocument();
    expect(electric).toBeInTheDocument();
    expect(fire).toBeInTheDocument();
    expect(bug).toBeInTheDocument();
    expect(poison).toBeInTheDocument();
    expect(psychic).toBeInTheDocument();
    expect(normal).toBeInTheDocument();
    expect(dragon).toBeInTheDocument();
    userEvent.click(electric);
    const pokemonName = 'pokemon-name';
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
    userEvent.click(poison);
    const ekansName = screen.getByTestId(pokemonName, {
      name: 'Ekans',
    });
    const poisonType = screen.getByTestId(pokemonType, {
      name: 'Poison',
    });
    expect(ekansName && poisonType && all).toBeInTheDocument();
    userEvent.click(psychic);
    const alakazanName = screen.getByTestId(pokemonName, {
      name: 'Alakazan',
    });
    const psychicType = screen.getByTestId(pokemonType, {
      name: 'Psychic',
    });
    expect(alakazanName && psychicType && all).toBeInTheDocument();
    userEvent.click(normal);
    const snorlaxName = screen.getByTestId(pokemonName, {
      name: 'Snorlax',
    });
    const normalType = screen.getByTestId(pokemonType, {
      name: 'Normal',
    });
    expect(snorlaxName && normalType && all).toBeInTheDocument();
    userEvent.click(dragon);
    const dragonairName = screen.getByTestId(pokemonName, {
      name: 'Dragonair',
    });
    const dragonType = screen.getByTestId(pokemonType, {
      name: 'Dragon',
    });
    expect(dragonairName && dragonType && all).toBeInTheDocument();
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

    const pokemonName = 'pokemon-name';
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
    const charmanderName = screen.getByTestId(pokemonName, {
      name: 'Charmander',
    });
    const fireType = screen.getByTestId(pokemonType, {
      name: 'Fire',
    });
    expect(charmanderName && fireType && resetButton).toBeInTheDocument();
    userEvent.click(bug);
    const caterpieName = screen.getByTestId(pokemonName, {
      name: 'Caterpie',
    });
    const bugType = screen.getByTestId(pokemonType, {
      name: 'Bug',
    });
    expect(caterpieName && bugType && resetButton).toBeInTheDocument();

    history.push('/');

    const buttonNext = screen.getByTestId('next-pokemon');

    userEvent.click(buttonNext);

    expect(charmanderName).toBeInTheDocument();

    userEvent.click(buttonNext);

    expect(caterpieName).toBeInTheDocument();
  });
});
