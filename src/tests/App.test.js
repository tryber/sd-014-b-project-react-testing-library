import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';

test('Teste se o topo da aplicação contém um conjunto de links de navegação', () => {
  const history = createMemoryHistory();
  render(<Router history={ history }><App /></Router>);

  const home = screen.getByText(/Home/i);
  const about = screen.getByText(/About/i);
  const favoritePokemons = screen.getByText(/Favorite Pokémons/i);

  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(favoritePokemons).toBeInTheDocument();
});

test('Deve acessar "Home"', () => {
  const history = createMemoryHistory();
  render(<Router history={ history }><App /></Router>);

  const home = screen.getByRole('link', { name: 'Home' });
  userEvent.click(home);

  const text = screen.getByText('Encountered pokémons');
  expect(text).toBeInTheDocument();
});

test('Deve acessar "About"', () => {
  const history = createMemoryHistory();
  render(<Router history={ history }><App /></Router>);

  const about = screen.getByRole('link', { name: 'About' });
  userEvent.click(about);

  const text = screen.getByText('About Pokédex');
  expect(text).toBeInTheDocument();
});

test('Deve acessar "Pokemons Favoritos"', () => {
  const history = createMemoryHistory();
  render(<Router history={ history }><App /></Router>);

  const favoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
  userEvent.click(favoritePokemons);

  const text = screen.getByText('Favorite pokémons');
  expect(text).toBeInTheDocument();
});

test('Se a aplicação contem a página "Not Found"', () => {
  const history = createMemoryHistory();
  render(<Router history={ history }><App /></Router>);
  history.push('/xablau');

  const notFound = screen.getByText(/Page requested not found/i);
  expect(notFound).toBeInTheDocument();
});
