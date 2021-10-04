import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o componente Pokemon', () => {
  test(`Testa se é renderizado um card com as informações
  de determinado pokemon`, () => {
    const { history } = renderWithRouter(<App />);

    fireEvent.click(screen.getByText('Poison'));
    const ekans = screen.getByText('Ekans');
    const poison = screen.getAllByText('Poison');
    const averageWeight = screen.getByText('Average weight: 6.9 kg');
    const pokemonImage = screen.getByRole('img');

    expect(ekans).toBeInTheDocument();
    expect(poison.length).toBe(2);
    expect(averageWeight).toBeInTheDocument();
    expect(pokemonImage).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png');
    expect(pokemonImage).toHaveProperty('alt', 'Ekans sprite');

    const moreDetails = screen.getByText('More details');
    fireEvent.click(moreDetails);
    fireEvent.click(screen.getByRole('checkbox'));
    const star = screen.getAllByRole('img')[1];
    expect(star).toHaveProperty('src', 'http://localhost/star-icon.svg');
    expect(star).toHaveProperty('alt', 'Ekans is marked as favorite');
    expect(history.location.pathname).toBe('/pokemons/23');
  });
});
