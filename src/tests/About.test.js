import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../RenderwithRouter';
import About from '../components/About';

describe('testa o componente About.js', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const infos = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(infos).toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const texts = screen.getAllByText(/Pokémons/);
    expect(texts.length).toBe(2);
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
