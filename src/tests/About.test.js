import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../uteis/renderWithRouter';
import About from '../components/About';

beforeEach(() => {
  renderWithRouter(<About />);
});

describe('Testa o componente About', () => {
  test('se a página contém um heading h2 com o texto "About Pokédex".', () => {
    const textH2 = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(textH2).toBeInTheDocument();
  });

  test('se a página contém dois parágrafos com texto sobre a Pokédex', () => {;
    const textParagraph = screen.getAllByText(/Pokémons/i);
    expect(textParagraph.length).toBe(2);
  });

  test('se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.', () => {
    const imgPokedex = screen.getByRole('img');
    expect(imgPokedex.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
