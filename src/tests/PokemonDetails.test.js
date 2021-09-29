import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderRouter from './renderRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  beforeEach(() => {
    renderRouter(<App />);
  });

  test('se informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    const moreDetailsBtn = screen.getByText(/More details/i);
    userEvent.click(moreDetailsBtn);
    const namePokemonDetails = screen.getByText('Pikachu Details');
    expect(namePokemonDetails).toBeInTheDocument();

    // Links que não devem existir
    const homeLink = screen.getByText(/Home/i);
    const aboutLink = screen.getByText(/About/i);
    const favPokeLink = screen.getByText(/Favorite Pokémons/i);
    expect(homeLink).toBeEnabled();
    expect(aboutLink).toBeEnabled();
    expect(favPokeLink).toBeEnabled();
    expect(moreDetailsBtn).toBeEnabled();

    const headingSummary = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(headingSummary).toBeInTheDocument();
    expect(headingSummary).toHaveTextContent('Summary');

    // Resumo do pokemon
    const summaryText = screen.getByText(/electricity/i);
    expect(summaryText).toBeInTheDocument();
  });

  test('existe na página seção com os mapas contendo as localizações do pokémon', () => {
    const moreDetailsBtn = screen.getByText('More details');
    userEvent.click(moreDetailsBtn);
    const mapsHeading = screen.getByRole('heading', {
      level: 2,
      name: /Game Locations/i,
    });
    expect(mapsHeading).toBeInTheDocument();
    expect(mapsHeading).toHaveTextContent('Game Locations of Pikachu');
    const firstLocation = screen.getByText('Kanto Viridian Forest');
    const secondLocation = screen.getByText('Kanto Power Plant');
    expect(firstLocation).toBeInTheDocument();
    expect(secondLocation).toBeInTheDocument();
    const imgLocations = screen.getAllByRole('img', { name: /Pikachu location/i });
    expect(imgLocations.length).toBe(2);
    expect(imgLocations[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgLocations[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(imgLocations[0].alt).toBe('Pikachu location');
    expect(imgLocations[1].alt).toBe('Pikachu location');
  });

  test('Se usuario pode Favoritar pokemon na pagina details', () => {
    const moreDetailsBtn = screen.getByText('More details');
    userEvent.click(moreDetailsBtn);
    const favCheckbox = screen.getByRole('checkbox');
    expect(favCheckbox).toBeInTheDocument();
    userEvent.click(favCheckbox);
    const pokeFavImg = screen.getByAltText('Pikachu is marked as favorite');
    expect(pokeFavImg).toBeInTheDocument();

    // Desfavoritando pokemon
    userEvent.click(favCheckbox);
    expect(pokeFavImg).toBeEnabled();
    const checkboxFavLabel = screen.getByLabelText('Pokémon favoritado?');
    expect(checkboxFavLabel).toBeInTheDocument();
  });
});
