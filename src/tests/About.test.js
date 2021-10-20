import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testing the component <App />', () => {
  describe('At the nav bar on the top of the page', () => {
    it('should have a link with the text "Home"', () => {
      renderWithRouter(<App />);
      expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    });
    it('should have a link with the text "About"', () => {
      renderWithRouter(<App />);
      expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    });
    it('should have a link with the text "Favorite Pokémons"', () => {
      renderWithRouter(<App />);
      expect(screen.getByRole('link', { name: /favorite pokémons/i }))
        .toBeInTheDocument();
    });
  });
  describe('Clicking on the link "Home" at the nav bar', () => {
    it('should redirect to the URL "/"', () => {
      const { history } = renderWithRouter(<App />);
      const homeLink = screen.getByRole('link', { name: /home/i });
      userEvent.click(homeLink);
      expect(history.location.pathname).toBe('/');
    });
  });
  describe('Clicking on the link "About" at the nav bar', () => {
    it('should redirect to the URL "/about"', () => {
      const { history } = renderWithRouter(<App />);
      const homeLink = screen.getByRole('link', { name: /about/i });
      userEvent.click(homeLink);
      expect(history.location.pathname).toBe('/about');
    });
  });
  describe('Clicking on the link "Favorite Pokémons" at the nav bar', () => {
    it('should redirect to the URL "/favorites"', () => {
      const { history } = renderWithRouter(<App />);

      const homeLink = screen.getByRole('link', { name: /favorite pokémons/i });
      userEvent.click(homeLink);
      expect(history.location.pathname).toBe('/favorites');
    });
  });
  describe('Inserting an invalid URL', () => {
    it('should redirect to the page "Not Found"', () => {
      const { history } = renderWithRouter(<App />);
      history.push('/invalid-url');

      expect(screen.getByRole('heading', { level: 2, name: /page requested not found/i }))
        .toBeInTheDocument();
    });
  });
});
