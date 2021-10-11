import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import { About } from '../components';

describe('Testes do componente <About.js />.', () => {
  it('A página contém um heading h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.textContent).toBe('About Pokédex');
  });

  it('A página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const paragraph1 = screen.getByText(/This application simulates/i);
    const paragraph2 = screen.getByText(/One can filter Pokémons/i);

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  it('A página contém uma imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const imgPokedex = screen.getByRole('img');
    expect(imgPokedex.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
