import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  const nameButton = 'Próximo pokémon';
  test('Teste se página contém um heading h2 com o texto Page requested not found 😭',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/');
      const title = screen.getByRole('heading', {
        level: 2,
        name: 'Encountered pokémons',
      });
      expect(title).toBeInTheDocument();
    });
  test('Teste se é exibido o próximo Pokémon da lista', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const buttonNextPokemon = screen.getByRole('button', { name: nameButton });
    expect(buttonNextPokemon).toBeInTheDocument();

    userEvent.click(buttonNextPokemon);

    const nextPokemon = screen.getByText('Charmander');
    expect(nextPokemon).toBeInTheDocument();

    userEvent.click(buttonNextPokemon);
    const pokemonNumber3 = screen.getByText('Caterpie');
    expect(pokemonNumber3).toBeInTheDocument();

    userEvent.click(buttonNextPokemon);
    const pokemonNumber4 = screen.getByText('Ekans');
    expect(pokemonNumber4).toBeInTheDocument();

    userEvent.click(buttonNextPokemon);
    const pokemonNumber5 = screen.getByText('Alakazam');
    expect(pokemonNumber5).toBeInTheDocument();

    userEvent.click(buttonNextPokemon);
    const pokemonNumber6 = screen.getByText('Mew');
    expect(pokemonNumber6).toBeInTheDocument();

    userEvent.click(buttonNextPokemon);
    const pokemonNumber7 = screen.getByText('Rapidash');
    expect(pokemonNumber7).toBeInTheDocument();

    userEvent.click(buttonNextPokemon);
    const pokemonNumber8 = screen.getByText('Snorlax');
    expect(pokemonNumber8).toBeInTheDocument();

    userEvent.click(buttonNextPokemon);
    const pokemonNumber9 = screen.getByText('Dragonair');
    expect(pokemonNumber9).toBeInTheDocument();

    userEvent.click(buttonNextPokemon);
    const firstPokemon = screen.getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();
  });
  test('Teste se é mostrado apenas um pokémon por vez', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const pokemonContainers = screen.getAllByTestId('pokemon-name');
    expect(pokemonContainers.length).toBe(1);
  });
  test('Teste se a Pokédex tem os botões de filtro', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const pokemonTypeButtons = screen.getAllByTestId('pokemon-type-button');
    const typesOfPokemon = 7;
    expect(pokemonTypeButtons.length).toBe(typesOfPokemon);
    const allTypesButton = screen.getByRole('button', { name: 'All' });
    expect(allTypesButton).toBeInTheDocument();
    expect(allTypesButton).toBeVisible();

    expect(pokemonTypeButtons[0]).toHaveTextContent('Electric');
    expect(allTypesButton).toBeInTheDocument();
    expect(pokemonTypeButtons[1]).toHaveTextContent('Fire');
    expect(allTypesButton).toBeInTheDocument();
    expect(pokemonTypeButtons[2]).toHaveTextContent('Bug');
    expect(allTypesButton).toBeInTheDocument();
    expect(pokemonTypeButtons[3]).toHaveTextContent('Poison');
    expect(allTypesButton).toBeInTheDocument();
    expect(pokemonTypeButtons[4]).toHaveTextContent('Psychic');
    expect(allTypesButton).toBeInTheDocument();
    expect(pokemonTypeButtons[5]).toHaveTextContent('Normal');
    expect(allTypesButton).toBeInTheDocument();
    expect(pokemonTypeButtons[6]).toHaveTextContent('Dragon');

    userEvent.click(pokemonTypeButtons[0]);
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();

    userEvent.click(pokemonTypeButtons[1]);
    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const allTypesButton = screen.getByRole('button', { name: 'All' });
    expect(allTypesButton).toBeInTheDocument();
    history.push('/about');
    history.push('/');

    const title = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(title).toBeInTheDocument();

    const nextButton = screen.getByText(nameButton);
    userEvent.click(nextButton);
    const nextPokemon2ndRound = screen.getByText('Charmander');
    expect(nextPokemon2ndRound).toBeInTheDocument();
  });

  test('Testa visibilidade dos botões', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const nextButton = screen.getByRole('button', { name: nameButton });
    const allButton = screen.getByRole('button', { name: 'All' });
    const electricButton = screen.getByRole('button', { name: 'Electric' });
    expect(nextButton).toBeVisible();
    expect(allButton).toBeVisible();
    userEvent.click(nextButton);
    expect(electricButton).toBeVisible();
    userEvent.click(electricButton);
    expect(nextButton).toBeDisabled();
    userEvent.click(allButton);
    expect(allButton).toBeEnabled();
  });
});
