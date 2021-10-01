import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testing component Pokemon', () => {
  it('should have informations about the pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toBeInTheDocument();
    expect(namePokemon).toHaveTextContent('Pikachu');
    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toBeInTheDocument();
    expect(typePokemon).toHaveTextContent('Electric');
    const weightPokemon = screen.getByTestId('pokemon-weight');
    expect(weightPokemon).toBeInTheDocument();
    expect(weightPokemon).toHaveTextContent('Average weight: 6.0 kg');
    const imgPokemon = screen.getByAltText('Pikachu sprite');
    expect(imgPokemon).toBeInTheDocument();
    expect(imgPokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

    const linkPokemon = screen.getByText('More details');
    expect(linkPokemon).toBeInTheDocument();

    userEvent.click(linkPokemon);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });

  it('should have a star', () => {
    renderWithRouter(<App />);

    const linkPokemon = screen.getByText('More details');
    expect(linkPokemon).toBeInTheDocument();
    userEvent.click(linkPokemon);

    const labelFavorite = screen.getByLabelText('Pokémon favoritado?');
    expect(labelFavorite).toBeInTheDocument();
    userEvent.click(labelFavorite);

    const labelStar = screen.getByAltText('Pikachu is marked as favorite');
    expect(labelStar).toBeInTheDocument();
    expect(labelStar).toHaveAttribute('src', '/star-icon.svg');
  });
});
