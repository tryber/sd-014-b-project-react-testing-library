import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

afterEach(cleanup);

describe('Renders application and applies tests', () => {
  it('should have a nav bar', () => {
    renderWithRouter(<App />);
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links[0]).toBe(screen.getByText(/home/i));
    expect(links[1]).toBe(screen.getByText(/about/i));
    expect(links[2]).toBe(screen.getByText(/favorite pokémons/i));
  });
  it('should redirect to homepage whenever Home is clicked', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/home/i));
    const path = history.location.pathname;
    expect(path).toBe('/');
  });
  it('should redirect to about page whenever About is clicked', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/about/i));
    const path = history.location.pathname;
    expect(path).toBe('/about');
  });
  it('should redirect to favorites page whenever Favorite Pokémon is clicked', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/favorite pokémons/i));
    const path = history.location.pathname;
    expect(path).toBe('/favorites');
  });
  it('should redirect to a not found page whenever an incorrect route is chosen', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/unknown-path');
    const image = screen.getByRole('heading', {
      name: 'Page requested not found Crying emoji',
    });
    expect(image).toBeInTheDocument();
  });
});
