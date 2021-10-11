import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Se são renderizadas as informações no componente Pokedex', () => {
  test('Se contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<App />);

    const pokedexHeading = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(pokedexHeading).toBeInTheDocument();
  });

  test('Se o botão próximo pokemon é renderizado', () => {
    renderWithRouter(<App />);

    const nextPokemonButton = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(nextPokemonButton).toBeInTheDocument();
  });

  test('Se o botão próximo pokemon passa para o próximo Pokémon', () => {
    renderWithRouter(<App />);

    const nextPokemonButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(nextPokemonButton);
    const secondPokemon = screen.getByTestId('pokemon-name');
    expect(secondPokemon).toHaveTextContent('Charmander');
    userEvent.click(nextPokemonButton);
    const thirdPokemon = screen.getByText('Caterpie');
    expect(thirdPokemon).toBeInTheDocument();
  });

  test('Se estiver no último pokémon, o botão volta para o primeiro', () => {
    renderWithRouter(<App />);

    const nextPokemonButton = screen.getByRole('button', {
      name: /próximo/i,
    });
    const pokeName = screen.getByTestId('pokemon-name');
    pokemons.forEach((pokemon, index) => {
      const lastPoke = pokemons.length - 1;
      if (index === lastPoke) {
        userEvent.click(nextPokemonButton);
        expect(pokeName).toHaveTextContent('Pikachu');
      } else {
        userEvent.click(nextPokemonButton);
      }
    });
  });

  test('Se é renderizado apenas um card de pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokeImages = screen.getAllByRole('img');
    expect(pokeImages.length).toBe(1);
  });

  test('Se são renderizados os botões de filtragem por tipo de pokémon', () => {
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

  test('O botão deve corresponder o tipo', () => {
    renderWithRouter(<App />);

    const poisonButton = screen.getByRole('button', {
      name: 'Poison',
    });
    userEvent.click(poisonButton);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Poison');
  });

  test('Se o botão all é renderizado na página e reseta os filtros', () => {
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

  test('Se o botão all está selecionado quando recarregar a página', () => {
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
