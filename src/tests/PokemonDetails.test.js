import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import data from '../data';

const URL_POKEMON = '/pokemons/25';

describe('7 - Teste o componente PokemonDetails', () => {
  it('se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push(URL_POKEMON);

    const namePokemon = screen.getByText(/Pikachu Details/i);
    expect(namePokemon).toBeInTheDocument();

    const summary = screen.getByRole('heading', { name: /Summary/i });
    expect(summary).toBeInTheDocument();

    const infosPokemon = screen.getByText(/This intelligent Pokémon/i);
    expect(infosPokemon).toBeInTheDocument();
  });

  it('se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(URL_POKEMON);

    const pokemonLocations = screen.getByRole('heading', {
      name: /Game Locations of Pikachu/i,
    });
    expect(pokemonLocations).toBeInTheDocument();

    const infosPokemon = screen.getByText(/This intelligent Pokémon/i);
    expect(infosPokemon).toBeInTheDocument();

    data[0].foundAt.forEach((pokemon, index) => {
      const nameLocation = screen.getByText(pokemon.location);
      const imageLocation = screen.getAllByRole('img', { name: /Pikachu location/i });
      expect(nameLocation).toBeInTheDocument();
      expect(imageLocation).toHaveLength(2);
      expect(imageLocation[index]).toHaveAttribute('src', pokemon.map);
      expect(imageLocation[index]).toHaveAttribute('alt', 'Pikachu location');
    });
  });

  it('se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    history.push(URL_POKEMON);

    const favoritePokemon = screen.getByRole('checkbox', {
      name: /Pokémon favoritado?/i,
    });
    expect(favoritePokemon).toBeInTheDocument();

    userEvent.click(favoritePokemon);
    const imgFavorite = screen.getByRole('img',
      { name: /Pikachu is marked as favorite/i });
    expect(imgFavorite).toBeInTheDocument();

    userEvent.click(favoritePokemon);
    expect(imgFavorite).not.toBeInTheDocument();
  });
});
