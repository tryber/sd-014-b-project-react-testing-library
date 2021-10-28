import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testa o componente PokemonDetails', () => {
  it('testa as informações do pokemon', () => {
    renderWithRouter(<App />);
    const details = screen.getByText(/more details/i);
    userEvent.click(details);
    const nameDetails = screen.getByText(/pikachu details/i);
    expect(nameDetails).toBeInTheDocument();
    expect(details).not.toBeInTheDocument();
    const heading2 = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(heading2).toBeInTheDocument();
    const paragraph = screen.getByText(/this intelligent pokémon/i);
    expect(paragraph).toBeInTheDocument();
    const otherHeading = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
      level: 2,
    });
    expect(otherHeading).toBeInTheDocument();
    const locations = screen.getAllByAltText(/pikachu location/i);
    expect(locations.length).toBe(2);
    const imgSrc1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const imgSrc2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    expect(locations[0]).toHaveAttribute('src', imgSrc1);
    expect(locations[1]).toHaveAttribute('src', imgSrc2);
    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado?/i });
    expect(checkbox).toBeInTheDocument();
  });
});
