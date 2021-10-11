import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Testes do componente <Pokedex.js />', () => {
  it('A página contém um heading h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.textContent).toBe('Encountered pokémons');
    expect(heading).toBeInTheDocument();
  });

  it('É exibido o próximo Pokémon da lista quando o botão "Próximo pokémon" é clicado',
    () => {
      renderWithRouter(<App />);

      const pokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonName.textContent).toBe('Pikachu');

      const buttonNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
      expect(buttonNextPokemon.textContent).toBe('Próximo pokémon');

      fireEvent.click(buttonNextPokemon);
      expect(pokemonName.textContent).toBe('Charmander');
      fireEvent.click(buttonNextPokemon);
      expect(pokemonName.textContent).toBe('Caterpie');
      fireEvent.click(buttonNextPokemon);
      expect(pokemonName.textContent).toBe('Ekans');
      fireEvent.click(buttonNextPokemon);
      expect(pokemonName.textContent).toBe('Alakazam');
      fireEvent.click(buttonNextPokemon);
      expect(pokemonName.textContent).toBe('Mew');
      fireEvent.click(buttonNextPokemon);
      expect(pokemonName.textContent).toBe('Rapidash');
      fireEvent.click(buttonNextPokemon);
      expect(pokemonName.textContent).toBe('Snorlax');
      fireEvent.click(buttonNextPokemon);
      expect(pokemonName.textContent).toBe('Dragonair');
      fireEvent.click(buttonNextPokemon);
      expect(pokemonName.textContent).toBe('Pikachu');
    });

  it('É mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getAllByTestId('pokemon-name');
    expect(pokemonName.length).toBe(1);

    const buttonNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    fireEvent.click(buttonNextPokemon);

    expect(pokemonName.length).toBe(1);
  });

  it('A Pokédex possui os botões de filtro', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: /All/i });
    const buttonsTypes = screen.getAllByTestId('pokemon-type-button');
    const NUM_TYPES = 7;

    expect(buttonAll).toBeInTheDocument();
    expect(buttonsTypes.length).toBe(NUM_TYPES);
  });

  it('A Pokédex filtra pokemons de fogo', () => {
    renderWithRouter(<App />);

    const buttonTypeFire = screen.getByRole('button', { name: /Fire/i });
    const buttonNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });

    fireEvent.click(buttonTypeFire);
    expect(buttonTypeFire.textContent).toBe('Fire');
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    fireEvent.click(buttonNextPokemon);
    expect(screen.getByText('Rapidash')).toBeInTheDocument();
    fireEvent.click(buttonNextPokemon);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });

  it('A Pokédex filtra pokemons psíquicos', () => {
    renderWithRouter(<App />);

    const buttonTypePsychic = screen.getByRole('button', { name: /Psychic/i });
    const buttonNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });

    fireEvent.click(buttonTypePsychic);
    expect(buttonTypePsychic.textContent).toBe('Psychic');
    expect(screen.getByText('Alakazam')).toBeInTheDocument();
    fireEvent.click(buttonNextPokemon);
    expect(screen.getByText('Mew')).toBeInTheDocument();
    fireEvent.click(buttonNextPokemon);
    expect(screen.getByText('Alakazam')).toBeInTheDocument();
  });

  it('A Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const firstPokemon = screen.getByText(/pikachu/i);
    const buttonAll = screen.getByRole('button', { name: /All/i });

    expect(buttonAll).toBeInTheDocument();
    expect(buttonAll.textContent).toBe('All');

    expect(firstPokemon).toBeInTheDocument();

    fireEvent.click(buttonAll);

    expect(firstPokemon).toBeInTheDocument();
  });
});
