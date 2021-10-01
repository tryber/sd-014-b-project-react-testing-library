import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

test('A página deve conter um título "About Pokédex"', () => {
  render(<About />);
  const title = screen.getByRole('heading', { level: 2 });
  const textTitle = screen.getByText('About Pokédex');

  expect(title).toBeInTheDocument();
  expect(textTitle).toBeInTheDocument();
});

test('Deve possuir dois paragrafos com texto sobre a pokedex', () => {
  render(<About />);
  const paragraph1 = screen.getByText(/This application simulates a Pokédex/i);
  const paragraph2 = screen.getByText(/One can filter Pokémons by type/i);

  expect(paragraph1).toBeInTheDocument();
  expect(paragraph2).toBeInTheDocument();
});

test('Deve possuir uma imagem da Pokédex', () => {
  render(<About />);
  const img = screen.getByAltText('Pokédex');
  const pathImage = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

  expect(img.src).toBe(pathImage);
});
