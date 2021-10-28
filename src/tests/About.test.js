import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente <About.js />', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const aboutPokedex = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(aboutPokedex).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const fisrtParagraph = screen.getByText(/This application simulates a Pokédex/);
    const secondParagraph = screen.getByText(/One can filter Pokémons by type/);
    expect(fisrtParagraph).toBeDefined();
    expect(secondParagraph).toBeDefined();
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
