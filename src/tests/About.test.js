import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
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
  renderWithRouter(<About />);
  const tag = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
  expect(tag).toBeInTheDocument();
});

test('Testa se a página contém dois parágrafos sobre a Pokédex', () => {
  renderWithRouter(<About />);
  const paragraph = screen.getAllByRole('p');
  expect(paragraph.length).toBe(2);
});

test('Testa se a página contém a imagem de uma pokédex', () => {
  renderWithRouter(<About />);
  const img = screen.getByRole('img');
  expect(img).toHaveAttribute(
    'src',
    'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
  );
});
