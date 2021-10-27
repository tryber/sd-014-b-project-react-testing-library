import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter.js';
import App from '../App';
// https://github.com/tryber/sd-014-b-project-react-testing-library/blob/beatriz-ribeiro-react-testing/src/tests/Pokedex.test.js
// referência código beatriz

describe('Testa componente `<Pokedex.js/>`', () => {
  test('se a página contém um h2 com o texto `Encountered pokémons`', () => {
    renderWithRouter(<App />);

    const title = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });

    expect(title).toBeInTheDocument();
  });

  test(
    'se é exibido o próximo Pokémon da lista quando o botão `Próximo pokémon` é clicado',
    () => {
      renderWithRouter(<App />);
      const nextPokemonButton = screen.getByRole('button', {
        name: /Próximo pokémon/i,
      });

      userEvent.click(nextPokemonButton);
      const pokemonCharmander = screen.getByText('Charmander');
      expect(pokemonCharmander).toBeInTheDocument();

      userEvent.click(nextPokemonButton);
      const pokemonCaterpie = screen.getByText('Caterpie');
      expect(pokemonCaterpie).toBeInTheDocument();

      userEvent.click(nextPokemonButton);
      const pokemonEkans = screen.getByText('Ekans');
      expect(pokemonEkans).toBeInTheDocument();

      userEvent.click(nextPokemonButton);
      const pokemonAlakazam = screen.getByText('Alakazam');
      expect(pokemonAlakazam).toBeInTheDocument();

      userEvent.click(nextPokemonButton);
      const pokemonMew = screen.getByText('Mew');
      expect(pokemonMew).toBeInTheDocument();

      userEvent.click(nextPokemonButton);
      const pokemonRapidash = screen.getByText('Rapidash');
      expect(pokemonRapidash).toBeInTheDocument();

      userEvent.click(nextPokemonButton);
      const pokemonSnorlax = screen.getByText('Snorlax');
      expect(pokemonSnorlax).toBeInTheDocument();

      userEvent.click(nextPokemonButton);
      const pokemonDragonair = screen.getByText('Dragonair');
      expect(pokemonDragonair).toBeInTheDocument();

      userEvent.click(nextPokemonButton);
      const pokemonPikachu = screen.getByText('Pikachu');
      expect(pokemonPikachu).toBeInTheDocument();
    },
  );

  test('se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const typePokemonButton = screen.getAllByTestId('pokemon-type-button');
    const SEVEN = 7;
    expect(typePokemonButton.length).toBe(SEVEN);
  });

  test('se o botão All está sempre visível', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: 'All' });

    userEvent.click(buttonAll);

    const pokemonPikachu = screen.getByText('Pikachu');
    expect(pokemonPikachu).toBeInTheDocument();
  });

  test('se existe um botão de filtragem para cada tipo de pokémon', () => {
    renderWithRouter(<App />);
    const psychicBtn = screen.getByRole('button', {
      name: 'Psychic',
    });
    expect(psychicBtn).toBeInTheDocument();
    userEvent.click(psychicBtn);

    const pokemonAlakazam = screen.getByText('Alakazam');
    expect(pokemonAlakazam).toBeInTheDocument();
  });
});
