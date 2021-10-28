import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const POKEMON_URL = '/pokemons/143';

describe('7. Testes do PokemonDetails.js', () => {
  it('Se os detalhes do Pokémon selecionado aparecem na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push(POKEMON_URL);

    const detailedPokemon = screen.getByText(/Snorlax Details/);
    const summary = screen.getByRole('heading', { name: 'Summary' });
    const pokemonInfo = screen.getByText(/What sounds like its cry may actually/);

    expect(detailedPokemon).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(pokemonInfo).toBeInTheDocument();
  });

  it('Se existe seção na página com localização dos Pokémons nos mapas', () => {
    const { history } = renderWithRouter(<App />);
    history.push(POKEMON_URL);

    const gameLocationTitle = screen.getByRole('heading',
      { name: /Game Locations of Snorlax/ });
    const locationImg = screen.getByAltText('Snorlax location');
    const locationName = screen.getByText('Kanto Vermillion City');

    expect(gameLocationTitle).toBeInTheDocument();
    expect(locationImg).toBeInTheDocument();
    expect(locationImg).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/5/54/Kanto_Vermilion_City_Map.png');
    expect(locationName).toBeInTheDocument();
  });

  it('Se é possível favoritar o Pokémon na página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    history.push(POKEMON_URL);

    const favoriteCheckbox = screen.getByRole('checkbox',
      { name: 'Pokémon favoritado?' });

    expect(favoriteCheckbox).toBeInTheDocument();
    userEvent.click(favoriteCheckbox);
  });
});
