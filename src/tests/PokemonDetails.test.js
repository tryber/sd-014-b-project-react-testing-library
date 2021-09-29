import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa as informações da página More details', () => {
  const moreDetails = 'More details';
  test('se o conteúdo está completo', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: moreDetails });
    userEvent.click(linkDetails);

    const title = screen.getByText('Pikachu Details');
    expect(title).toBeInTheDocument();

    const summary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(summary).toBeInTheDocument();

    expect(linkDetails).not.toBeInTheDocument();

    const paragraph = screen.getByText(/This intelligent/);
    expect(paragraph).toBeInTheDocument();
  });

  test('se os mapas existem na página', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: moreDetails });
    userEvent.click(linkDetails);

    const titleLocation = screen.getByText('Game Locations of Pikachu');
    expect(titleLocation).toBeInTheDocument();

    const quantityLocation = screen.getAllByAltText('Pikachu location');
    expect(quantityLocation.length).toBe(2);
    expect(quantityLocation[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(quantityLocation[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('se o checkbox para favoritar existe e funciona', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: moreDetails });
    userEvent.click(linkDetails);

    const checkboxInput = screen.getByLabelText('Pokémon favoritado?');
    expect(checkboxInput).toBeInTheDocument();
  });
});
