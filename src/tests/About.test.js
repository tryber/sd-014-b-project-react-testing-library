import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from './utils/renderWithRouter';
import About from '../components/About';

describe('Teste o componente <About.js />', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);

    const header = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(header).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const p1 = screen.getByText(/this application simulates a pokédex/i);
    expect(p1).toBeInTheDocument();

    const p2 = screen.getByText(/one can filter pokémons by type/i);
    expect(p2).toBeInTheDocument();
  });

  test('Teste se a página contém a imagem de uma Pokédex.', () => {
    renderWithRouter(<About />);

    const imgSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = screen.getByRole('img');
    expect(image.src).toBe(imgSrc);
  });
});
