import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Req7: Testing Component <PokemonDetails />', () => {
  const moreDetails = 'More details';
  test('if renders name, header and info about pokemon', () => {
    renderWithRouter(<App />);
    const linkToDetails = screen.getByRole('link', {
      name: moreDetails,
    });
    fireEvent.click(linkToDetails);

    const detailsHeader = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });

    const summaryHeader = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });

    const detailsParagraph = screen.getByText(/This intelligent Pokémon/);

    expect(summaryHeader).toBeInTheDocument();
    expect(detailsParagraph).toBeInTheDocument();

    expect(detailsHeader).toBeInTheDocument();
    expect(linkToDetails).not.toBeInTheDocument();
  });

  test('if maps are rendered on the page', () => {
    renderWithRouter(<App />);
    const linkToDetails = screen.getByRole('link', {
      name: moreDetails,
    });
    fireEvent.click(linkToDetails);

    const locationHeader = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });

    const pikachuLocations = screen.getAllByAltText('Pikachu location');

    expect(locationHeader).toBeInTheDocument();
    expect(pikachuLocations.length).toBe(2);
    expect(pikachuLocations[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(pikachuLocations[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('if user can favorite a pokemon from details page', () => {
    renderWithRouter(<App />);
    const linkToDetails = screen.getByRole('link', {
      name: moreDetails,
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
