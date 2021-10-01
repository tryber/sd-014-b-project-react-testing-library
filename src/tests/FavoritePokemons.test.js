import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Verifições no componente Favorite Pokémons', () => {
  it('Should have a message "No favorite pokemon found"', () => {
    renderWithRouter(<App />);

    const linkFavoritePokemon = screen.getByText('Favorite Pokémons');
    userEvent.click(linkFavoritePokemon);

    const noFavoritePokemon = screen.getByText('No favorite pokemon found');
    expect(noFavoritePokemon).toBeInTheDocument();
  });

  it('Expect to have a favorite Pokemon', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByText('More details');
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const labelFavorite = screen.getByLabelText('Pokémon favoritado?');
    expect(labelFavorite).toBeInTheDocument();
    userEvent.click(labelFavorite);

    const linkFavoritePokemon = screen.getByText('Favorite Pokémons');
    expect(linkFavoritePokemon).toBeInTheDocument();
    userEvent.click(linkFavoritePokemon);

    const pikachu = screen.getByTestId('pokemon-name');
    expect(pikachu).toBeInTheDocument();
    expect(pikachu).toHaveTextContent('Pikachu');
  });
});
