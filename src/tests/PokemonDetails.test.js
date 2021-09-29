import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

const POKEMON_URL = '/pokemons/143';

describe('7 - Testa o componente PokemonDetails.js', () => {
  it('Testa se as informações detalhadas do Pokémon são mostradas na tela.', () => {
    const { history } = renderWithRouter(<App />);
    history.push(POKEMON_URL);

    const pokemonNameDetails = screen.getByText('Snorlax Details');
    const summary = screen.getByRole('heading', {
      name: 'Summary',
      level: 2,
    });
    const summaryPokemon = screen.getByText(/What sounds like its cry may actually/);

    expect(pokemonNameDetails).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(summaryPokemon).toBeInTheDocument();
  });
  it('Testa se existe na página uma seção com as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(POKEMON_URL);

    const gameLocationTitle = screen.getByRole('heading',
      { name: 'Game Locations of Snorlax' });
    const locationImage = screen.getByAltText('Snorlax location');
    const locationName = screen.getByText('Kanto Vermillion City');

    expect(gameLocationTitle).toBeInTheDocument();
    expect(locationImage).toBeInTheDocument();
    expect(locationImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/5/54/Kanto_Vermilion_City_Map.png');
    expect(locationName).toBeInTheDocument();
  });
  it('Testa se existe na página uma seção com as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(POKEMON_URL);

    const favoriteCheckbox = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });

    expect(favoriteCheckbox).toBeInTheDocument();
    userEvent.click(favoriteCheckbox);
  });
});
