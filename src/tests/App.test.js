import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Testa se o topo da aplicação contém um conjunto links de navegação.', () => {
  renderWithRouter(<App />);
  const home = screen.getByText('Home');
  expect(home).toBeInTheDocument();
  const about = screen.getByText('About');
  expect(about).toBeInTheDocument();
  const favPokemon = screen.getByText('Favorite Pokémons');
  expect(favPokemon).toBeInTheDocument();
});

test('Testa se a aplicação é redirecionada para a página Home', () => {
  const { history } = renderWithRouter(<App />);
  fireEvent.click(screen.getByText('Home'));
  const home = history.location.pathname;
  expect(home).toBe('/');
});

test('Testa se a aplicação é redirecionada para a página About', () => {
  const { history } = renderWithRouter(<App />);
  fireEvent.click(screen.getByText('About'));
  const about = history.location.pathname;
  expect(about).toBe('/about');
});

test('Testa se a aplicação é redirecionada para a página de Pokémons Favoritados', () => {
  const { history } = renderWithRouter(<App />);
  fireEvent.click(screen.getByText('Favorite Pokémons'));
  const favorite = history.location.pathname;
  expect(favorite).toBe('/favorites');
});

test('Testa se a aplicação é redirecionada para uma página não encontrada', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/notfoundpage');
  const noMatch = screen.getByText('😭');
  expect(noMatch).toBeInTheDocument();
});
