import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import About from '../components/About';

describe('2. Teste o componente <About.js />', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<Router><About /></Router>);
    const h2 = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(h2).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(<Router><About /></Router>);
    const paragraph1 = screen.getByText(/simulates a Pokédex/i);
    const paragraph2 = screen.getByText(/Pokémons by type/i);
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    render(<Router><About /></Router>);
    const img = screen.getByRole('img');
    const imgUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(img.src).toContain(imgUrl);
  });
});
