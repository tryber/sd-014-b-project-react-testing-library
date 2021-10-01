import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokedex } from '../components';

const pokemons = [
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Alola Route 3',
        map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 3',
        map: 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 4',
        map: 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
      },
      {
        location: 'Kanto Rock Tunnel',
        map: 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
      },
    ],
    summary: 'The flame on its tail shows the strength of its life force.',
  },
  {
    id: 23,
    name: 'Ekans',
    type: 'Poison',
    averageWeight: {
      value: '6.9',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Ekans_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Goldenrod Game Corner',
        map: 'https://cdn2.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png',
      },
    ],
    summary: 'It can freely detach its jaw to swallow large prey whole.',
  },
  {
    id: 78,
    name: 'Rapidash',
    type: 'Fire',
    averageWeight: {
      value: '95.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/5/58/Spr_5b_078.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Rapidash_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Route 28',
        map: 'https://cdn2.bulbagarden.net/upload/5/5b/Kanto_Route_28_Map.png',
      },
      {
        location: 'Johto Mount Silver',
        map: 'https://cdn2.bulbagarden.net/upload/9/95/Johto_Mt_Silver_Map.png',
      },
    ],
    summary: 'At full gallop, its four hooves barely touch the ground.',
  },
];

const renderWithRouter = () => {
  const history = createMemoryHistory();
  return (
    render(
      <Router history={ history }>
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ { isPokemonFavoriteById: true } }
        />
      </Router>,
    )
  );
};

describe('Testa se o componente Pokedex:', () => {
  test('contém um heading com texto "Encountered pokémons" ', () => {
    renderWithRouter();
    const heading = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(heading).toBeInTheDocument();
  });

  test('O próximo Pokémon é listado quando o botão é clicado', () => {
    renderWithRouter();
    const buttonNextPoke = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(buttonNextPoke).toBeInTheDocument();
    const firstPoke = screen.getByText(pokemons[0].name);
    expect(firstPoke).toBeInTheDocument();
    userEvent.click(buttonNextPoke);
    const secondPoke = screen.getByText(pokemons[1].name);
    expect(secondPoke).toBeInTheDocument();
    userEvent.click(buttonNextPoke);
    const thirdPoke = screen.getByText(pokemons[2].name);
    expect(thirdPoke).toBeInTheDocument();
    userEvent.click(buttonNextPoke);
    expect(firstPoke).toBeInTheDocument();
  });

  test('É mostrado apenas um pokemon por vez', () => {
    renderWithRouter();
    const NUM_OF_ACTUAL_POKE = 1;
    const pokemonLink = screen.getAllByRole('link', { name: 'More details' });
    expect(pokemonLink.length).toBe(NUM_OF_ACTUAL_POKE);
  });

  test('contem os botões de filto', () => {
    renderWithRouter();
    const NUM_OF_TYPE_BUTTONS = 2;
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    expect(typeButtons.length).toBe(NUM_OF_TYPE_BUTTONS);
    expect(typeButtons[0]).toHaveTextContent('Fire');

    const nextPokeTestId = 'next-pokemon';

    expect(screen.getByTestId(nextPokeTestId)).toBeEnabled();

    const poisonButton = screen.getByRole('button', { name: 'Poison' });
    userEvent.click(poisonButton);
    const ekansPoke = screen.getByText('Ekans');
    expect(ekansPoke).toBeInTheDocument();

    userEvent.click(typeButtons[0]);
    expect(screen.getByTestId(nextPokeTestId)).toBeEnabled();
    userEvent.click(typeButtons[1]);
    expect(screen.getByTestId(nextPokeTestId)).toBeDisabled();
  });

  test('contém um botão para resetar o filtro', () => {
    renderWithRouter();
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();

    const nextPoke = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(nextPoke);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Poison');
    userEvent.click(nextPoke);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Fire');
  });
});
