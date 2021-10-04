import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe(' Teste o componente PokemonDetails', () => {
  const moreDetails = 'More details';

  it('Teste se as informações detalhadas do Pokémon selecionado são mostradas', () => {
    renderWithRouter(<App />);

    const detailsButton = screen.getByText(moreDetails);
    userEvent.click(detailsButton);

    const pokemonDetails = screen.getByText('Pikachu Details');
    expect(pokemonDetails).toBeInTheDocument();
    expect(detailsButton).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(summary).toBeInTheDocument();

    const resume = screen.getByText(/This intelligent Pokémon/i);
    expect(resume).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas', () => {
    renderWithRouter(<App />);

    const detailsButton = screen.getByText(moreDetails);
    userEvent.click(detailsButton);

    const gameLocations = screen.getByRole('heading', {
      level: 2,
      name: /Game Locations of Pikachu/i,
    });
    expect(gameLocations).toBeInTheDocument();

    const locationsMap = screen.getAllByAltText('Pikachu location');
    expect(locationsMap).toHaveLength(2);

    const locationText1 = screen.getByText('Kanto Viridian Forest');
    const locationText2 = screen.getByText('Kanto Power Plant');
    expect(locationText1).toBeInTheDocument();
    expect(locationText2).toBeInTheDocument();

    expect(locationsMap[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locationsMap[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    const pokemonsDetails = screen.getByText(moreDetails);
    userEvent.click(pokemonsDetails);

    const favoritePokemonCheckbox = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favoritePokemonCheckbox);

    const favoritePage = screen.getByText('Favorite Pokémons');
    userEvent.click(favoritePage);

    const pokemonName = screen.getByText('Pikachu');
    expect(pokemonName).toBeInTheDocument();

    const pokemonsDetails2 = screen.getByText(moreDetails);
    userEvent.click(pokemonsDetails2);

    userEvent.click(favoritePokemonCheckbox);

    userEvent.click(favoritePage);
    expect(pokemonName).not.toBeInTheDocument();
  });
});
