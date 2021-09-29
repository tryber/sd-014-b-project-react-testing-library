import React from 'react';
import { screen } from '@testing-library/react';
import renderRouter from './renderRouter';
import About from '../components/About';

describe('Teste o componente <About.js />.', () => {
  beforeEach(() => {
    renderRouter(<About />);
  });

  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    expect(screen.getAllByText(/Pokédex/i)[0]).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    expect(screen.getAllByText(/Pokédex/i).length).toBe(2);
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const image = screen.getByAltText('Pokédex');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
