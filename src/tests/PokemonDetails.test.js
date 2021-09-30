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
  });
  it('should contain a description paragraph', () => {
    const SIX = 6;
    const paragraph = screen.getAllByText((_content, element) => (
      element.tagName.toLowerCase() === 'p'
    ));
    expect(paragraph.length).toBe(SIX);
  });
});
