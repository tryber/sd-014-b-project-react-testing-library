import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('Se existem links na página inicial', () => {
  renderWithRouter(<App />);
  const linkHome = screen.getByRole('link', { name: 'Home' });
  const linkAbout = screen.getByRole('link', { name: 'About' });
  const linkFav = screen.getByRole('link', { name: 'Favorite Pokémons' });

  expect(linkHome).toBeInTheDocument();
  expect(linkAbout).toBeInTheDocument();
  expect(linkFav).toBeInTheDocument();
});
