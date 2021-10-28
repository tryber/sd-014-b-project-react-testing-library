import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';

const moreDetails = 'More details';

describe('if pokemon details page works', () => {
  test('if detailed info about the pokemon are shown', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const moreDetailsLink = screen.getByRole('link', {
      name: moreDetails,
    });
    userEvent.click(moreDetailsLink);

    const pikachuDetailsTitle = screen.getByText('Pikachu Details');
    expect(pikachuDetailsTitle).toBeInTheDocument();

    const summaryTitle = screen.getByText('Summary');
    expect(summaryTitle).toBeInTheDocument();

    const summaryPhrase = screen.getByText(/This intelligent Pokémon roasts hard/i);
    expect(summaryPhrase).toBeInTheDocument();
  });

  test('if a map section exist', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const moreDetailsLink = screen.getByRole('link', {
      name: moreDetails,
    });
    userEvent.click(moreDetailsLink);

    const mapsTitle = screen.getByText('Game Locations of Pikachu');
    expect(mapsTitle).toBeInTheDocument();

    const maps = screen.getAllByAltText('Pikachu location');
    const location = screen.getByText('Kanto Viridian Forest');

    expect(maps[0]).toBeInTheDocument();
    expect(maps[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(location).toBeInTheDocument();
  });

  test('if can favorite pokemon from details page', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const moreDetailsLink = screen.getByRole('link', {
      name: moreDetails,
    });
    userEvent.click(moreDetailsLink);

    const favoriteButton = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    expect(favoriteButton).toBeInTheDocument();
  });
});
