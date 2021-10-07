import { render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('requisito 3', () => {
  test('se aparece not found caso não tenha pokemons na lista', () => {
    render(<FavoritePokemons />);
    const notFodundPokemon = screen.getByText('No favorite pokemon found');
    expect(notFodundPokemon).toBeInTheDocument();
  });

  test('se exibe pokemons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const btnPoke = screen.getAllByTestId('pokemon-type-button');
    userEvent.click(btnPoke[0]);
    const linkmoreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkmoreDetails);
    const checkBoxChecked = screen.getByRole('checkbox', { checked: false });
    userEvent.click(checkBoxChecked);
    const linkFavortie = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavortie);
    const namePoke = screen.getAllByTestId('pokemon-name');
    const typePoke = screen.getAllByTestId('pokemon-type');
    const averagePoke = screen.getAllByTestId('pokemon-weight');

    expect(namePoke[0]).toBeInTheDocument();
    expect(typePoke[0]).toBeInTheDocument();
    expect(averagePoke[0]).toBeInTheDocument();
    expect(history.location.pathname).toBe('/favorites');
  });
});
