import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente PokemonDetails', () => {
  const PIKACHU_DETAILS_URL = '/pokemons/25';

  it('deveria conter informações detalhadas do Pokemón', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PIKACHU_DETAILS_URL);
    const pokemonNameDetails = screen.getByText('Pikachu Details');
    const summaryTitle = screen.getByRole('heading', {
      name: 'Summary',
      level: 2,
    });
    const summaryDescription = screen.getByText('This intelligent Pokémon roasts hard '
    + 'berries with electricity to make them tender enough to eat.');

    expect(pokemonNameDetails).toBeInTheDocument();
    expect(summaryTitle).toBeInTheDocument();
    expect(summaryDescription).toBeInTheDocument();
  });

  it('deveria exibir uma seção contendo mapas com localizações do Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PIKACHU_DETAILS_URL);
    const locationTitle = screen.getByRole('heading', {
      name: 'Game Locations of Pikachu',
      level: 2,
    });
    const pikachuLocationsMaps = screen.getAllByAltText('Pikachu location');
    const pikachuLocationsName = screen.getAllByText(/Kanto/);

    pikachuLocationsMaps.forEach((map) => expect(map).toBeInTheDocument);
    pikachuLocationsName.forEach((location) => expect(location).toBeInTheDocument);
    expect(pikachuLocationsMaps[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(pikachuLocationsMaps[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(pikachuLocationsName[0]).toHaveTextContent(/Kanto Viridian Forest/);
    expect(pikachuLocationsName[1]).toHaveTextContent(/Kanto Power Plant/);
    expect(locationTitle).toBeInTheDocument();
  });

  it('deveria poder favotirar um Pokémon e desfavoritar', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PIKACHU_DETAILS_URL);
    const uncheckedCheckbox = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
      checked: false,
    });
    expect(uncheckedCheckbox).toBeInTheDocument();
    userEvent.click(uncheckedCheckbox);
    expect(uncheckedCheckbox).toBeChecked();
    const checkedCheckbox = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
      checked: true,
    });
    userEvent.click(checkedCheckbox);
    expect(checkedCheckbox).not.toBeChecked();
  });
});
