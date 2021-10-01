import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  const pokemons = [
    {
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
      foundAt: [
        {
          location: 'Kanto Viridian Forest',
          map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
        },
        {
          location: 'Kanto Power Plant',
          map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
        },
      ],
      summary: 'This intelligent Pokémon roasts hard berries'
        + ' with electricity to make them tender enough to eat.',
    },
  ];

  const LINK_DETAILS = 'More details';

  test(`Teste se as informações detalhadas do Pokémon
    selecionado são mostradas na tela`, () => {
    renderWithRouter(<App />);
    const pokemonLinkDetails = screen.getByRole('link', { name: LINK_DETAILS });
    userEvent.click(pokemonLinkDetails);

    const pokemonDetailsTitle = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    const summaryTitle = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });

    const descPokemon = screen.getByText(pokemons[0].summary);
    expect(pokemonDetailsTitle).toBeInTheDocument();
    expect(pokemonLinkDetails).not.toBeInTheDocument();
    expect(summaryTitle).toBeInTheDocument();
    expect(descPokemon).toBeInTheDocument();
  });

  test(`Teste se existe na página uma seção com
    os mapas contendo as localizações do pokémon`, () => {
    renderWithRouter(<App />);
    const pokemonLinkDetails = screen.getByRole('link', { name: LINK_DETAILS });
    userEvent.click(pokemonLinkDetails);

    const pokemonLocation = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });
    expect(pokemonLocation).toBeInTheDocument();

    const imgLocation = screen.getAllByAltText('Pikachu location');
    pokemons[0].foundAt.forEach(({ location, map }, index) => {
      expect(imgLocation[index]).toHaveAttribute('src', map);
      expect(screen.getByText(location)).toBeInTheDocument();
    });
  });

  test(`Teste se o usuário pode favoritar um pokémon
    através da página de detalhes`, () => {
    renderWithRouter(<App />);
    const pokemonLinkDetails = screen.getByRole('link', { name: LINK_DETAILS });
    userEvent.click(pokemonLinkDetails);

    const checkFavorite = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(checkFavorite).toBeInTheDocument();

    userEvent.click(checkFavorite);
    const pokemonFavorite = screen.getByAltText('Pikachu is marked as favorite');
    expect(pokemonFavorite).toBeInTheDocument();

    userEvent.click(checkFavorite);
    expect(pokemonFavorite).not.toBeInTheDocument();
  });
});
