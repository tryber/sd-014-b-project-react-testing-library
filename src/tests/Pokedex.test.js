import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  test('Se contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const pokedexH2 = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(pokedexH2).toBeInTheDocument();
  });

  test('se é exibido o próximo Pokémon da lista quando Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);

    const nextPokemon = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(nextPokemon).toBeInTheDocument();
  });

  test('Se os próximo Pokémons são exibidos ao clicar sucessivamente no botão', () => {
    renderWithRouter(<App />);

    const nextPokemons = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(nextPokemons);
    const secondPokemon = screen.getByTestId('pokemon-name');
    expect(secondPokemon).toHaveTextContent('Charmander');
    userEvent.click(nextPokemons);
    const thirdPokemon = screen.getByText('Caterpie');
    expect(thirdPokemon).toBeInTheDocument();
  });

  test('Se estiver no último Pokémon, ao clicar no botão volta para o primeiro', () => {
    renderWithRouter(<App />);

    const nextPokemonButton = screen.getByRole('button', {
      name: /próximo/i,
    });
    const pokemonName = screen.getByTestId('pokemon-name');
    pokemons.forEach((pokemon, index) => {
      const lastPokemon = pokemon.length - 1;
      if (index === lastPokemon) {
        userEvent.click(nextPokemonButton);
        expect(pokemonName).toHaveTextContent('Pikachu');
      } else {
        userEvent.click(nextPokemonButton);
      }
    });
  });

  test('Se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokeImages = screen.getAllByRole('img');
    expect(pokeImages.length).toBe(1);
  });

  test('Se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const typesOfPokemon = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    const buttonTypes = screen.getAllByTestId('pokemon-type-button');
    const mapTypes = buttonTypes.map((type) => type.innerHTML);
    expect(mapTypes).toEqual(typesOfPokemon);
  });

  test('A funcionalidade dos filtros por tipo de Pokémon', () => {
    renderWithRouter(<App />);

    const fireButton = screen.getByRole('button', {
      name: 'Fire',
    });
    userEvent.click(fireButton);
    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();
    const bugButton = screen.getByRole('button', {
      name: 'Bug',
    });
    userEvent.click(bugButton);
    const caterpie = screen.getByText('Caterpie');
    expect(caterpie).toBeInTheDocument();
  });

  test('O texto do botão deve corresponder ao nome do tipo', () => {
    renderWithRouter(<App />);

    const poisonButton = screen.getByRole('button', {
      name: 'Poison',
    });
    userEvent.click(poisonButton);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Poison');
  });

  test('Se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const dragonButton = screen.getByRole('button', {
      name: 'Dragon',
    });
    userEvent.click(dragonButton);
    const dragonairText = screen.getByText('Dragonair');
    expect(dragonairText).toBeInTheDocument();
    const allButton = screen.getByRole('button', {
      name: 'All',
    });
    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);
    const pikachuText = screen.getByText(/pikachu/i);
    expect(pikachuText).toBeInTheDocument();
  });

  test('Se ao carregar a página, o filtro selecionado deverá ser All', () => {
    renderWithRouter(<App />);

    const normalButton = screen.getByRole('button', {
      name: 'Normal',
    });
    userEvent.click(normalButton);
    const snorlaxText = screen.getByText('Snorlax');
    expect(snorlaxText).toBeInTheDocument();
    const aboutLink = screen.getByRole('link', {
      name: 'About',
    });
    userEvent.click(aboutLink);
    const homeLink = screen.getByRole('link', {
      name: 'Home',
    });
    userEvent.click(homeLink);
    const pikachuText = screen.getByText('Pikachu');
    expect(pikachuText).toBeInTheDocument();
  });
});
