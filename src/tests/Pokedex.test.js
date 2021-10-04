import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente Pokedex', () => {
  const pokemonid = 'pokemon-name';
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const headingPokedex = screen.getByText(/Encountered pokémons/i);
    expect(headingPokedex).toBeInTheDocument();
  });

  it('Teste o próximo Pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);
    const buttonNextPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });

    userEvent.click(buttonNextPokemon);
    const pokemonNameCharmander = screen.getByTestId(pokemonid);
    expect(pokemonNameCharmander).toHaveTextContent('Charmander');

    userEvent.click(buttonNextPokemon);
    const pokemonNameCaterpie = screen.getByTestId(pokemonid);
    expect(pokemonNameCaterpie).toHaveTextContent('Caterpie');

    userEvent.click(buttonNextPokemon);
    const pokemonNameEkans = screen.getByTestId(pokemonid);
    expect(pokemonNameEkans).toHaveTextContent('Ekans');

    userEvent.click(buttonNextPokemon);
    const pokemonNameAlakazam = screen.getByTestId(pokemonid);
    expect(pokemonNameAlakazam).toHaveTextContent('Alakazam');

    userEvent.click(buttonNextPokemon);
    const pokemonNameMew = screen.getByTestId(pokemonid);
    expect(pokemonNameMew).toHaveTextContent('Mew');

    userEvent.click(buttonNextPokemon);
    const pokemonNameRapidash = screen.getByTestId(pokemonid);
    expect(pokemonNameRapidash).toHaveTextContent('Rapidash');

    userEvent.click(buttonNextPokemon);
    const pokemonNameSnorlax = screen.getByTestId(pokemonid);
    expect(pokemonNameSnorlax).toHaveTextContent('Snorlax');

    userEvent.click(buttonNextPokemon);
    const pokemonNameDragonair = screen.getByTestId(pokemonid);
    expect(pokemonNameDragonair).toHaveTextContent('Dragonair');

    userEvent.click(buttonNextPokemon);
    const pokemonNamePikachu = screen.getByTestId(pokemonid);
    expect(pokemonNamePikachu).toHaveTextContent('Pikachu');
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getAllByTestId('pokemon-name');
    expect(pokemonName).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const buttonType = screen.getAllByTestId('pokemon-type-button');
    const buttonNumbers = 7;
    expect(buttonType).toHaveLength(buttonNumbers);

    const buttonElectric = screen.getByRole('button', { name: /Electric/i });
    expect(buttonElectric).toBeInTheDocument();
    const pokemonNamePikachu = screen.getByTestId(pokemonid);
    expect(pokemonNamePikachu).toHaveTextContent('Pikachu');

    const buttonFire = screen.getByRole('button', { name: /Fire/i });
    expect(buttonFire).toBeInTheDocument();
    userEvent.click(buttonFire);
    const pokemonNameCharmander = screen.getByTestId(pokemonid);
    expect(pokemonNameCharmander).toHaveTextContent('Charmander');

    const buttonBug = screen.getByRole('button', { name: /Bug/i });
    expect(buttonBug).toBeInTheDocument();
    userEvent.click(buttonBug);
    const pokemonNameCaterpie = screen.getByTestId(pokemonid);
    expect(pokemonNameCaterpie).toHaveTextContent('Caterpie');

    const buttonPoison = screen.getByRole('button', { name: /Poison/i });
    expect(buttonPoison).toBeInTheDocument();
    userEvent.click(buttonPoison);
    const pokemonNameEkans = screen.getByTestId(pokemonid);
    expect(pokemonNameEkans).toHaveTextContent('Ekans');

    const buttonPsychic = screen.getByRole('button', { name: /Psychic/i });
    expect(buttonPsychic).toBeInTheDocument();
    userEvent.click(buttonPsychic);
    const pokemonNameAlakazam = screen.getByTestId(pokemonid);
    expect(pokemonNameAlakazam).toHaveTextContent('Alakazam');

    const buttonNormal = screen.getByRole('button', { name: /Normal/i });
    expect(buttonNormal).toBeInTheDocument();
    userEvent.click(buttonNormal);
    const pokemonNameSnorlax = screen.getByTestId(pokemonid);
    expect(pokemonNameSnorlax).toHaveTextContent('Snorlax');

    const buttonDragon = screen.getByRole('button', { name: /Dragon/i });
    expect(buttonDragon).toBeInTheDocument();
    userEvent.click(buttonDragon);
    const pokemonNameDragonair = screen.getByTestId(pokemonid);
    expect(pokemonNameDragonair).toHaveTextContent('Dragonair');
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: /All/i });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
    const pokemonNamePikachu = screen.getByTestId(pokemonid);
    expect(pokemonNamePikachu).toHaveTextContent('Pikachu');

    const buttonNextPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(buttonNextPokemon);
    const pokemonNameCharmander = screen.getByTestId(pokemonid);
    expect(pokemonNameCharmander).toHaveTextContent('Charmander');
  });
});
