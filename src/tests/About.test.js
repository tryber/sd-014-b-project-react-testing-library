import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

beforeEach(() => renderWithRouter(<About />));

describe('Teste o componente <About.js />', () => {
  test('Página contém um heading h2 com o texto About Pokédex', () => {
    const title = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(title).toBeInTheDocument();
  });

  test('Página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const paragraphs = screen.getAllByText(/Pokémons/);
    expect(paragraphs.length).toBe(2);
  });

  test('Página contém a imagem de uma Pokédex', () => {
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
