import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Req6: Testing Component <Pokemon />', () => {
  test('if <Pokemon /> renders name, type, heigth, measurement unit and image', () => {
    renderWithRouter(<App />);
    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const pokeImg = screen.getByRole('img');

    expect(pokeName.innerHTML).toBe('Pikachu');
    expect(pokeType.innerHTML).toBe('Electric');
    expect(pokeWeight).toBeInTheDocument();
    expect(pokeWeight.innerHTML).toBe('Average weight: 6.0 kg');
    expect(pokeImg).toBeInTheDocument();
    expect(pokeImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokeImg).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test('if <Pokemon /> has a working navigation link to pokemon details', () => {
    const { history } = renderWithRouter(<App />);
    const linkToDetails = screen.getByRole('link', {
      name: 'More details',
    });

    expect(linkToDetails).toBeInTheDocument();
    fireEvent.click(linkToDetails);
    expect(history.location.pathname).toBe('/pokemons/25'); // crédito: Helena Greco
  });

  test('if theres a star icon upon favorite pokemon', () => {
    renderWithRouter(<App />);
    const linkToDetails = screen.getByRole('link', {
      name: 'More details',
    });
    fireEvent.click(linkToDetails);
    const favoriteCheck = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });

    fireEvent.click(favoriteCheck);

    const starIcon = screen.getAllByRole('img')[1];
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(starIcon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
