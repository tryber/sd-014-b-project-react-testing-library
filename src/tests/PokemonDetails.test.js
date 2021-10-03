import React from 'react';
import { screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  it('Teste se as informações detalhadas do Pokémon selecionado aparecem na tela', () => {
    const path = '/pokemons/25';
    const { history } = renderWithRouter(<App />);
    history.push(path);

    const pokemonName = screen.getByText('Pikachu Details');
    expect(pokemonName).toBeDefined();

    const summary = screen
      .getByRole('heading', { level: 2, name: 'Summary' });
    expect(summary).toBeDefined();

    const pokemonSummary = screen.getByText(/This intelligent Pokémon roasts/);
    expect(pokemonSummary).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com mapas contendo as localizações do pokémon',
    () => {
      const path = '/pokemons/23';
      const { history } = renderWithRouter(<App />);
      history.push(path);

      const pokemonLocation = screen
        .getByRole('heading', { level: 2, name: 'Game Locations of Ekans' });
      expect(pokemonLocation).toBeDefined();

      const imageLocation = screen.getByAltText('Ekans location');
      expect(imageLocation).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png');

      const location = screen.getByText('Goldenrod Game Corner');
      expect(location).toBeDefined();
    });
  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes.',
    () => {
      const path = '/pokemons/23';
      const { history } = renderWithRouter(<App />);
      history.push(path);

      const checkFavotitePokemon = screen
        .getByRole('checkbox', { name: 'Pokémon favoritado?' });
      fireEvent.click(checkFavotitePokemon);
      expect(checkFavotitePokemon).toBeDefined();
    });
});
