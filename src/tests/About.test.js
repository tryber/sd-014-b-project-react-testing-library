import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente <About.js>', () => {
  test('Verifica se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const titleAbout = screen.getByRole('heading', { level: 2 });
    expect(titleAbout).toHaveTextContent('About Pokédex');
  });

  test('Verifica se a página contém dois parágrafos com o texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const firstParagraph = screen.getByText(/This application simulates a Pokédex/);
    expect(firstParagraph).toBeInTheDocument();
    const secundParagraph = screen.getByText(/One can filter Pokémons/);
    expect(secundParagraph).toBeInTheDocument();
  });

  test('Verifica se a página contém a imagem específica de uma Pokédex ', () => {
    renderWithRouter(<About />);

    // testing

    const pokedexImg = screen.getByRole('img');
    expect(pokedexImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
