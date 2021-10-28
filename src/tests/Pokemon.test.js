import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';

const moreDetails = 'More details';

describe('if pokemon page works', () => {
  test('if render card with pokemon info', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const resetButton = screen.getByText('All');
    userEvent.click(resetButton);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');

    const pokemonImg = screen.getByAltText('Pikachu Sprite');
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('if link to details works', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const detailsLink = screen.getByText(moreDetails);
    expect(detailsLink.href).toContain('/pokemons/25');
  });

  test('if more details link works correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const detailsLink = screen.getByText(moreDetails);
    userEvent.click(detailsLink);

    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('if a star icon exists on favourites pokemons', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const detailsLink = screen.getByText(moreDetails);
    userEvent.click(detailsLink);

    const favoriteButton = screen.getByRole('checkbox');
    userEvent.click(favoriteButton);

    const starIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
