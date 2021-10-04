import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const POKEMON_URL = '/pokemons/143';

describe('Testa PokemonDetails', () => {
  it('Testa se tem as infos detalhadas', () => {
    const { history } = renderWithRouter(<App />);
    history.push(POKEMON_URL);

    const nameDetails = screen.getByText('Snorlax Details');
    const summary = screen.getByRole('heading', {
      name: 'Summary',
      level: 2,
    });
    const summaryPokemon = screen.getByText(/What sounds like its cry may actually/);

    expect(nameDetails).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(summaryPokemon).toBeInTheDocument();
  });

  it('se existe localização do pokemon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(POKEMON_URL);

    const locationTitle = screen.getByRole('heading',
      { name: 'Game Locations of Snorlax' });
    const locationImage = screen.getByAltText('Snorlax location');
    const locationName = screen.getByText('Kanto Vermillion City');

    expect(locationTitle).toBeInTheDocument();
    expect(locationImage).toBeInTheDocument();
    expect(locationImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/5/54/Kanto_Vermilion_City_Map.png');
    expect(locationName).toBeInTheDocument();
  });

  it('Teste se existe a pagina de seção', () => {
    const { history } = renderWithRouter(<App />);
    history.push(POKEMON_URL);

    const checkbox = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });

    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);
  });
});
