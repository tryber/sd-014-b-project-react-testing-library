import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Testa se a página contém informações sobre a Pokedex', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/about');

  const { pathname } = history.location;
  expect(pathname).toBe('/about');

  const title = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
  expect(title).toBeInTheDocument();
});

test('Testa se a página contém um h2 com o texto "About Pokémon"', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/about');

  const { pathname } = history.location;
  expect(pathname).toBe('/about');

  const firstParagraph = screen.getByText('This application simulates',
    { exact: false });
  expect(firstParagraph).toBeInTheDocument();

  const secondParagraph = screen.getByText('One can filter Pokémons',
    { exact: false });
  expect(secondParagraph).toBeInTheDocument();
});

test('Testa se a página contém a imagem de uma pokédex', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/about');

  const { pathname } = history.location;
  expect(pathname).toBe('/about');

  const imgPokedex = screen.getByRole('img');
  expect(imgPokedex).toHaveAttribute('src',
    'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
