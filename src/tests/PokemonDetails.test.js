import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Página Pokemon Details', () => {
  test('Informações do pokemon', () => {
    renderWithRouter(<App />);

    const button = screen.getByText(/More details/i);
    userEvent.click(button);
    const titleDetails = screen.getByText('Pikachu Details');
    expect(titleDetails).toBeInTheDocument();

    const titleSummary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(titleSummary).toBeInTheDocument();

    expect(button).not.toBeInTheDocument();

    const describe = screen.getByText(/This intelligent Pokémon roasts/i);
    expect(describe).toBeInTheDocument();
  });

  test('Seção Game Location', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');

    const gameLocation = screen.getByText('Game Locations of Pikachu');
    expect(gameLocation).toBeInTheDocument();

    const location = screen.getAllByAltText('Pikachu location');
    expect(location.length).toBe(2);

    expect(location[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');

    expect(location[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('Checkbox ', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');

    const checkbox = screen.getByLabelText(/Pokémon favoritado/i);
    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);
    const favoriteImg = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteImg).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(favoriteImg).not.toBeInTheDocument();
  });
});
