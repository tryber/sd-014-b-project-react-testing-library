import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helper/renderWithRouter';
import About from '../components/About';

const paragrafos = [
  'This application simulates a Pokédex, a digital encyclopedia containing all Pokémons',
  'One can filter Pokémons by type, and see more details for each one of them',
];
test('se a pagina contem as informações sobre  a pokedex', () => {
  renderWithRouter(<About />);
  const titulo = screen.getByRole('heading', { name: 'About Pokédex' });
  expect(titulo).toBeInTheDocument();
  expect(screen.getByText(paragrafos[0])).toBeInTheDocument();
  expect(screen.getByText(paragrafos[1])).toBeInTheDocument();
});

test('Se a imagem correta esta presente', () => {
  renderWithRouter(<About />);
  const image = screen.getByRole('img');
  expect(image).toBeInTheDocument();
  expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
