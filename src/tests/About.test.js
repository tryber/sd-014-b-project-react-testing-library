import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testa se o componente About:', () => {
  test('tem as informações sobre a pokedex', () => {
    render(<About />);
    const appInfo = screen.getByText(/This application simulates a Pokédex/i);
    expect(appInfo).toBeInTheDocument();
    const appFunc = screen.getByText(/One can filter Pokémons by type/i);
    expect(appFunc).toBeInTheDocument();
  });

  test('tem um heading com texto "About Pokédex"', () => {
    render(<About />);
    const heading = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(heading).toBeInTheDocument();
  });

  test('contém dois parágrafos com o texto sobre Pokédex', () => {
    render(<About />);
    const pokedexTexts = screen.getAllByText(/Pokédex/i);
    expect(pokedexTexts.length).toBe(2);
  });

  test('contém uma imagem especifica', () => {
    render(<About />);
    const img = screen.getByRole('img');
    expect(img.src).toContain('Gen_I_Pok%C3%A9dex.png');
  });
});
