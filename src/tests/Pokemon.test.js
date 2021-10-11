import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';

describe('test component Pokemon', () => {
  const pokemon = {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  };
  test('if a card with the information for a particular Pokémon is rendered', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);
    const name = screen.getByText('Pikachu');
    const type = screen.getByText('Electric');
    const avaregeWeight = screen.getByText('Average weight: 6.0 kg');
    const image = screen.getByRole('img');
    expect(name).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(avaregeWeight).toBeInTheDocument();
    expect(image)
      .toHaveAttribute('src',
        'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(image).toHaveAttribute('alt', 'Pikachu sprite');
    expect(image).toBeInTheDocument();
  });
  test('if Pokémon contains a navigation link to view details of this Pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);
    const moreDetailsLink = screen.getByRole('link', {
      name: 'More details',
    });
    expect(moreDetailsLink).toHaveAttribute('href', '/pokemons/25');
    expect(moreDetailsLink).toBeInTheDocument();
  });
  test('if clicking the link redirects to the Pokémon details page', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', {
      name: 'More details',
    });
    userEvent.click(moreDetailsLink);
    const title = screen.getByText('Pikachu Details');
    expect(title).toBeInTheDocument();
    expect(history.location.pathname).toBe('/pokemons/25');
  });
  test('if there is a star icon on favorite Pokemons', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);
    const starIcon = screen.getByRole('img', {
      name: 'Pikachu is marked as favorite',
    });
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(starIcon).toBeInTheDocument();
  });
});
