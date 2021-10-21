import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <About.js />', () => {
  test('Se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const headingAbout = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(headingAbout).toBeInTheDocument();
  });

  test('se a quantidade de parágrafos é igual a 2', () => {
    renderWithRouter(<About />);
    const quantityParagraphs = screen.getAllByText(/Pokémons/);
    expect(quantityParagraphs.length).toBe(2);
  });

  test('se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const pokedexImage = screen.getByRole('img');
    expect(pokedexImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
