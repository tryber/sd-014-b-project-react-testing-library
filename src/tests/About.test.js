import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testa as funcionalidades do About', () => {
  it('testa se a página possui um h2', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(heading).toBeInTheDocument();
  });

  it('testa se a página possui 2 parágrafos', () => {
    renderWithRouter(<About />);
    const paragraphOne = screen.getByText(/This application simulates a Pokédex/i);
    const paragraphTwo = screen.getByText(/One can filter Pokémons by type/i);

    expect(paragraphOne).toBeInTheDocument();
    expect(paragraphTwo).toBeInTheDocument();
  });

  it('testa se a pagina possui uma imagem', () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img');
    expect(img).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
