import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testando o About', () => {
  test('Testa se a página contém as informações sobre a Pokédex', () => {
    render(<About />);
    const aboutPage = screen.queryByText('This application simulates', { exact: false });
    expect(aboutPage).toBeInTheDocument();
  });

  test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const pokedexHeading = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex' });
    expect(pokedexHeading).toBeInTheDocument();
  });

  test('Testa se a página contém dois parágrafos com texto sobre a Pokedex', () => {
    render(<About />);
    const firstParagraph = screen.getByText('This application', { exact: false });
    expect(firstParagraph).toBeInTheDocument();
    const secondParagraph = screen.getByText('One can filter', { exact: false });
    expect(secondParagraph).toBeInTheDocument();
  });

  test('Testa se a página contém uma imagem', () => {
    render(<About />);
    const pokedexImage = screen.getByRole('img');
    expect(pokedexImage.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
