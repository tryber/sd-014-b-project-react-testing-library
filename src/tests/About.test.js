import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Component about', () => {
  it('Teste se a página contém um heading h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);
    const aboutPage = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(aboutPage).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const aboutParOne = screen.getByText(/This application simulates/i);
    const aboutParTwo = screen.getByText(/One can filter/i);
    expect(aboutParOne).toBeInTheDocument();
    expect(aboutParTwo).toBeInTheDocument();
  });

  it('Teste se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const aboutImage = screen.getByAltText('Pokédex');
    expect(aboutImage.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

// Referência para testar o link da imagem: https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
// Referência para encontrar corretamente o texto dos parágrafos: https://github.com/tryber/sd-014-b-project-react-testing-library/pull/49
