import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o funcionamento do componente Pokemon Details', () => {
  const PIKACHU_URL = '/pokemons/25';
  it('Testa se as informações do pokemons rederizam na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PIKACHU_URL);

    const pokemonDetails = screen.getByText('Pikachu Details');
    expect(pokemonDetails).toBeInTheDocument();

    const summary = screen.getByRole('heading', {
      name: 'Summary', level: 2 });
    expect(summary).toBeInTheDocument();

    const description = screen.getByText(/This intelligent Pokémon roasts hard/i);
    expect(description).toBeInTheDocument();
  });
  it('Testa se o componente exibe os mapas com a localização do Pokemon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PIKACHU_URL);

    const gameLocation = screen.getByText('Game Locations of Pikachu');
    expect(gameLocation).toBeInTheDocument();

    const locations = screen.getAllByAltText('Pikachu location');
    expect(locations.length).toBe(2);

    expect(locations[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locations[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('Testa o funcionamneto do checkbox', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PIKACHU_URL);

    const unchecked = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?', checked: false });
    expect(unchecked).toBeInTheDocument();
    userEvent.click(unchecked);
    expect(unchecked).toBeChecked();

    const checked = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?', checked: true });
    expect(checked).toBeInTheDocument();
    userEvent.click(checked);
    expect(checked).not.toBeChecked();
  });
});
