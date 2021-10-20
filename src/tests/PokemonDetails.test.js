import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  it('Teste se as informações detalhadas do Pokémon selecionado aparecem na tela', () => {
    const pathPokeChoice = '/pokemons/25';
    const { history } = renderWithRouter(<App />);
    history.push(pathPokeChoice);

    const pokeName = screen.getByText('Pikachu Details');
    expect(pokeName).toBeDefined();

    // https://testing-library.com/docs/queries/byrole/

    const summary = screen
      .getByRole('heading', { level: 2, name: 'Summary' });
    expect(summary).toBeInTheDocument();

    const pokemonSummary = screen.getByText(/This intelligent Pokémon roasts/);
    expect(pokemonSummary).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com mapas contendo as localizações do pokémon',
    () => {
      const pathPokeChoice = '/pokemons/23';
      const { history } = renderWithRouter(<App />);
      history.push(pathPokeChoice);

      const imgLocation = screen.getByAltText('Ekans location');
      expect(imgLocation).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png');

      const pokeLocation = screen
        .getByRole('heading', { level: 2, name: 'Game Locations of Ekans' });
      expect(pokeLocation).toBeInTheDocument();

      const location = screen.getByText('Goldenrod Game Corner');
      expect(location).toBeInTheDocument();
    });
  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes.',
    () => {
      const path = '/pokemons/23';
      const { history } = renderWithRouter(<App />);
      history.push(path);

      const checkFavotitePokemon = screen
        .getByRole('checkbox', { name: 'Pokémon favoritado?' });
      userEvent.click(checkFavotitePokemon);
      expect(checkFavotitePokemon).toBeInTheDocument();
    });
});
