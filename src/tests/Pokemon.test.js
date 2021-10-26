import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokemon } from '../components';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const pokemonMock = { id: 65, name: 'Alakazam', type: 'Psychic', averageWeight: { value: '48.0', measurementUnit: 'kg' }, image: 'https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png', moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Alakazam_(Pok%C3%A9mon)', foundAt: [{ location: 'Unova Accumula Town', map: 'https://cdn2.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png' }], summary: 'Closing both its eyes heightens all its other senses. This enables it to use its abilities to their extremes.' };

describe('Tests the Pokemon.js application', () => {
  const moreDetails = 'More details';
  test('renders a card with informations of a determined pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonMock } isFavorite={ false } />);
    const name = screen.getByTestId('pokemon-name').textContent;
    const type = screen.getByTestId('pokemon-type').textContent;
    const weight = screen.getByTestId('pokemon-weight').textContent;
    const image = screen.getByRole('img');
    expect(name).toBe('Alakazam');
    expect(type).toBe('Psychic');
    expect(weight).toBe('Average weight: 48.0 kg');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png');
    expect(image.alt).toBe('Alakazam sprite');
  });
  test('pokémon card contains navigation link to its details page', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: moreDetails });
    expect(link.href).toBe('http://localhost/pokemons/25');
  });
  test('clicking the navigation link redirects to the pokémon`s details page', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: moreDetails });
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  test('url matches the id of the pokémon being detailed', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: moreDetails });
    userEvent.click(link);
    const { pathname } = history.location;
    const heading = screen.getByRole('heading', { level: 2, name: 'Pikachu Details' });
    expect(pathname).toBe('/pokemons/25');
    expect(heading).toBeInTheDocument();
  });
  test('renders a star icon on favorited pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonMock } isFavorite />);
    const image = screen.getAllByRole('img')[1];
    expect(image.src).toBe('http://localhost/star-icon.svg');
    expect(image.alt).toBe('Alakazam is marked as favorite');
  });
});
