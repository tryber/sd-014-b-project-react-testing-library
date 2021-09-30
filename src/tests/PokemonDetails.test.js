import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <PokemonDetails.js />', () => {
  const pokemonDetailsUrl = '/pokemons/25';
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push(pokemonDetailsUrl);
      const pokemonTextDetails = screen.getByText('Pikachu Details');
      expect(pokemonTextDetails).toBeInTheDocument();
      const pokemonNavDetails = screen.queryByRole('link', { name: 'More details' });
      expect(pokemonNavDetails).not.toBeInTheDocument();
      const headingDetails = screen.getByRole('heading', { level: 2, name: 'Summary' });
      expect(headingDetails).toBeInTheDocument();
      const phrase1 = 'This intelligent Pokémon roasts hard berries with electricity';
      const phrase2 = ' to make them tender enough to eat.';
      const pokemonTextSummary = screen.getByText(phrase1 + phrase2);
      expect(pokemonTextSummary).toBeInTheDocument();
    });
  test(`Teste se existe na página uma 
  seção com os mapas contendo as localizações do pokémon`, () => {
    const { history } = renderWithRouter(<App />);
    history.push(pokemonDetailsUrl);
    const headingDetails = screen.getByRole('heading',
      { level: 2, name: 'Game Locations of Pikachu' });
    expect(headingDetails).toBeInTheDocument();
    const pikachuLocations = screen.getAllByAltText('Pikachu location');
    expect(pikachuLocations.length).toBe(2);
    const kantoViridianForest = pikachuLocations[0];
    expect(kantoViridianForest).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    const kantoPowerPlant = pikachuLocations[1];
    expect(kantoPowerPlant).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    const kantoViridianForestText = screen.getByText('Kanto Viridian Forest');
    const kantoPowerPlantText = screen.getByText('Kanto Power Plant');
    expect(kantoViridianForestText).toBeInTheDocument();
    expect(kantoPowerPlantText).toBeInTheDocument();
  });
  test('Teste se o usuário pode favoritar um pokémon através da página de detalhes',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push(pokemonDetailsUrl);
      const checkboxFavorite = screen
        .getByRole('checkbox', { name: 'Pokémon favoritado?' });
      userEvent.click(checkboxFavorite);
      const starShownFavorite = screen.getByAltText('Pikachu is marked as favorite');
      expect(starShownFavorite).toBeInTheDocument();
      expect(starShownFavorite).toHaveAttribute('class', 'favorite-icon');
      expect(starShownFavorite).toHaveAttribute('src', '/star-icon.svg');
      userEvent.click(checkboxFavorite);
      expect(starShownFavorite).not.toBeInTheDocument();
    });
});
