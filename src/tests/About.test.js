import React from 'react';
import { screen } from '@testing-library/react';

import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente <About.js />.', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);

    const aboutTitleH2 = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(aboutTitleH2).toBeInTheDocument();
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const aboutParagraph1 = screen.getByText(/This application/i);
    const aboutParagraph2 = screen.getByText(/One can/i);

    expect(aboutParagraph1).toBeInTheDocument();
    expect(aboutParagraph2).toBeInTheDocument();
  });

  it('Testa se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const logoPokedex = screen.getByRole('img');
    expect(logoPokedex).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
