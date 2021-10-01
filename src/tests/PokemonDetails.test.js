import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

afterEach(cleanup);
const route = '/pokemons/25';

describe('renders detail page', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push(route);
  });
  it('should contain a title with the pokémon name', () => {
    const title = screen.getByRole('heading', {
      level: 2,
      name: /pikachu details/i,
    });
    expect(title).toBeInTheDocument();
  });
  it('should not contain a more details link', () => {
    const detailsLink = screen.queryByText(/more details/i);
    expect(detailsLink).not.toBeInTheDocument();
  });
  it('should contain a summary subtitle', () => {
    const title = screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Summary');
  });
  it('should contain a description paragraph', () => {
    const paragraph = screen.getAllByText((content, element) => (
      element.tagName.toLowerCase() === 'p'
      && content.startsWith('This intelligent Pokémon')
    ));
    expect(paragraph.length).toBe(1);
  });
  it('should contain maps section', () => {
    const title = screen.getAllByText((content, element) => (
      element.tagName.toLowerCase() === 'h2'
      && content.startsWith('Game Locations of Pikachu')
    ));
    expect(title.length).toBe(1);
    const maps = screen.getAllByRole('img', { name: (/pikachu location/i) });
    expect(maps.length).toBe(2);
    expect(maps).toEqual(screen.getAllByAltText(/pikachu location/i));
    expect(maps[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(maps[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  it('should display a favorite checkbox', () => {
    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();
  });
});
