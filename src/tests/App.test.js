import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import RenderWithRouter from '../RenderWithRouter';

test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  RenderWithRouter(<App />);
  const homeLink = screen.getByRole('link', { name: 'Home' });
  const aboutLink = screen.getByRole('link', { name: 'About' });
  const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

  expect(homeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(favoriteLink).toBeInTheDocument();
});
