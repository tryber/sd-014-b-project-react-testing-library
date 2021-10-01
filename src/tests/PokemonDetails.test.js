import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 7: ', () => {
  it('Testa os detalhes do pokémon', () => {
    renderWithRouter(<App />);

    const detailLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(detailLink);

    const testIDPikachu = screen.getByTestId('pokemon-name');
    expect(testIDPikachu).toBeInTheDocument();
    expect(detailLink).not.toBeInTheDocument();

    const pokemonDetailH2 = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    expect(pokemonDetailH2).toBeInTheDocument();

    const summary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(summary).toBeInTheDocument();

    const details = screen.getByText(/This intelligent Pokémon/i);
    expect(details).toBeInTheDocument();
  });

  it('Na página de seção aparecem os mapas?', () => {
    renderWithRouter(<App />);

    const detailLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(detailLink);

    const gameLocationsH2 = screen.getByRole('heading', {
      level: 2,
      name: /Game Locations of/i,
    });
    expect(gameLocationsH2).toBeInTheDocument();

    const allLocations = screen.getAllByAltText('Pikachu location');
    expect(allLocations.length).toBe(2);

    const locationName = screen.getByText('Kanto Viridian Forest');
    expect(allLocations[0]).toBeInTheDocument();
    expect(locationName).toBeInTheDocument();

    expect(allLocations[0]).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    );
    expect(allLocations[0]).toHaveAttribute('alt', 'Pikachu location');

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);

    const starFavorite = screen.getByAltText('Pikachu is marked as favorite');
    expect(starFavorite).toBeInTheDocument();

    userEvent.click(checkbox);

    expect(starFavorite).not.toBeInTheDocument();

    const pokemonFvoritado = screen.getByLabelText('Pokémon favoritado?');
    expect(pokemonFvoritado).toBeInTheDocument();
  });
});
