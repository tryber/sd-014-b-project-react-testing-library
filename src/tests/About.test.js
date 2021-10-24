import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

test('Se a pagina contem um heading h2 com o texto About "About Pokédex" ', () => {
  render(<About />);

  const title = screen.getByRole('heading', {
    level: 2,
    name: 'About Pokédex',
  });

  expect(title).toBeInTheDocument();
});

test('Se a pagina contem 2 paragrafos com texto sobre a Pokedex', () => {
  render(<About />);

  const textFirstOne = 'This application simulates a Pokédex,';
  const textFirstSecond = ' a digital encyclopedia containing all Pokémons';
  const textAllParagraph = textFirstOne + textFirstSecond;
  const textSecondOne = 'One can filter Pokémons by type,';
  const textSecondTwo = ' and see more details for each one of them';
  const textAllSecond = textSecondOne + textSecondTwo;
  const firstParagraph = screen.getByText(textAllParagraph);
  const secondParagraph = screen.getByText(textAllSecond);

  expect(firstParagraph).toBeInTheDocument();
  expect(secondParagraph).toBeInTheDocument();
});

test('se a pagina contem a imagem da pokedex', () => {
  render(<About />);
  const urlImg = `https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png`;
  const getImg = screen.getByRole('img');

  expect(getImg).toHaveAttribute('src', urlImg);
});
