import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente <PokemonDetails.js />', () => {
  test('Se as informações detalhadas do Pokémon são exibidas na tela', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pokemons/25');

    const headingDetails = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    expect(headingDetails).toBeInTheDocument();

    const headingSummary = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(headingSummary).toBeInTheDocument();

    const resume = screen.getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(resume).toBeInTheDocument();
  });

  test('Se existe o mapa contendo a localização do Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pokemons/23');

    const headingLocations = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Ekans',
    });
    expect(headingLocations).toBeInTheDocument();

    const locationOne = screen.getByText('Goldenrod Game Corner');
    expect(locationOne).toBeInTheDocument();

    const pokemonLocation = screen.getByAltText('Ekans location');
    expect(pokemonLocation).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png');
    expect(pokemonLocation).toBeInTheDocument();
  });

  test('Se o usuário pode favoritar o pokémon pela página de detalhes', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pokemons/10');

    const favoritePokemon = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(favoritePokemon);
    expect(favoritePokemon).toBeInTheDocument();
  });
});
