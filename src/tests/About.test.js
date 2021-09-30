import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Requisito 2 - Informações da About Page', () => {
  test('Verifica se a página contém um h2 com o texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const pokedexText = screen.getByRole('heading', {
      level: 2, name: 'About Pokédex' });
    expect(pokedexText).toBeInTheDocument();
  });
});

test('Verifica se a página contém 2 parágrafos sobre a Pokédex', () => {
  renderWithRouter(<About />);

  const pokedexParagraph = screen.getAllByText(/Pokémons/);
  expect(pokedexParagraph.length).toBe(2);
});

test('Verifica se a página contém a imagem de uma Pokédex', () => {
  renderWithRouter(<About />);

  const pokedexImage = screen.getByRole('img');
  expect(pokedexImage).toBeInTheDocument();
  expect(pokedexImage).toHaveAttribute('src',
    'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png' );
});
