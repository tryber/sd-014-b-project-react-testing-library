import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import { Pokemon } from '../components';
import App from '../App';

const {
  id,
  name,
  type,
  averageWeight: { value, measurementUnit },
  image,
} = pokemons[0];

afterEach(cleanup);

describe('renders pokemon component', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  it('should display pokemon name', () => {
    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon.tagName.toLowerCase()).toBe('p');
    expect(pokemon).toBeInTheDocument();
    expect(pokemon).toHaveTextContent(name);
  });
  it('should display pokemon type', () => {
    const element = screen.getByTestId('pokemon-type');
    expect(element.tagName.toLowerCase()).toBe('p');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(type);
  });
  it('should display pokemon weight', () => {
    const weight = screen.getByTestId('pokemon-weight');
    expect(weight.tagName.toLowerCase()).toBe('p');
    expect(weight).toBeInTheDocument();
  });
  it('should display weight in text format', () => {
    const weightExpression = screen.getByText(
      `Average weight: ${value} ${measurementUnit}`,
    );
    expect(weightExpression).toBeInTheDocument();
  });
  it('should display an image', () => {
    const img = screen.getByAltText(`${name} sprite`);
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(image);
  });
  it('should contain a details link', () => {
    const link = screen.getByText(/more details/i);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `/pokemons/${id}`);
  });
});

test('if button is able to redirect to details', () => {
  const { history } = renderWithRouter(<App />);
  const link = screen.getByText(/more details/i);
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute('href', `/pokemons/${id}`);
  userEvent.click(link);
  const path = history.location.pathname;
  expect(path).toBe(`/pokemons/${id}`);
});

test('if pokemon is a favorite', () => {
  renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
  const star = screen.getByAltText(`${name} is marked as favorite`);
  const starUrl = '/star-icon.svg';
  expect(star).toBeInTheDocument();
  expect(star).toHaveAttribute('src', starUrl);
});
