import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Tests the App.js application', () => {
  describe('Tests if the head of the application has a fixed group of navigation links',
    () => {
      test('first link has the `Home` text', () => {
        renderWithRouter(<App />);
        const link = screen.getByRole('link', { name: 'Home' });
        expect(link).toBeInTheDocument();
      });
      test('second link has the `About` text', () => {
        renderWithRouter(<App />);
        const link = screen.getByRole('link', { name: 'About' });
        expect(link).toBeInTheDocument();
      });
      test('third link has the `Favorite Pokémons` text', () => {
        renderWithRouter(<App />);
        const link = screen.getByRole('link', { name: 'Favorite Pokémons' });
        expect(link).toBeInTheDocument();
      });
    });
  describe('Tests if the application is redirected to:', () => {
    test('home page when the `Home` link is clicked', () => {
      const { history } = renderWithRouter(<App />);
      const link = screen.getByRole('link', { name: 'Home' });
      userEvent.click(link);
      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });
    test('`About` page when the `About` link is clicked', () => {
      const { history } = renderWithRouter(<App />);
      const link = screen.getByRole('link', { name: 'About' });
      userEvent.click(link);
      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    });
    test('`Pokémons Favoritados` page when the `Favorite Pokémons` link is clicked', () => {
      const { history } = renderWithRouter(<App />);
      const link = screen.getByRole('link', { name: 'Favorite Pokémons' });
      userEvent.click(link);
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });
    test('`Not Found` page when entering an unknown URL', () => {
      const { history } = renderWithRouter(<App />);
      history.push('/uahhadhunkfj57820s');
      const text = screen.getByRole('heading', {
        level: 2, name: 'Page requested not found Crying emoji',
      });
      expect(text).toBeInTheDocument();
    });
  });
});
