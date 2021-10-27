import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('teste do componente About', () => {
  it('contém um text h2 About Pokédex', () => {
    renderWithRouter(<About />);
    const heading2 = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(heading2).toBeInTheDocument();
  });
  it('contém dois parágrafos', () => {
    renderWithRouter(<About />);
    const par1 = screen.getByText(/encyclopedia/i);
    expect(par1).toBeInTheDocument();
    const par2 = screen.getByText(/filter/i);
    expect(par2).toBeInTheDocument();
  });
  it('a imagem certa é renderizada', () => {
    renderWithRouter(<About />);
    const img = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', img);
  });
});
