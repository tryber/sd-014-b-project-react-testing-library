import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Página about', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    render(<About />);
    const aboutPage = screen.getByTestId('about-page');
    expect(aboutPage).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto "About Pokédex"', () => {
    render(<About />);
    const aboutHeading = screen.getByTestId('about-heading');
    expect(aboutHeading).toHaveTextContent('About Pokédex');
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const aboutText = screen.getAllByTestId('about-text');
    expect(aboutText).toHaveLength(2);
  });

  it('Teste se a página contém a imagem de uma Pokédex', () => {
    render(<About />);
    const aboutImage = screen.getByTestId('about-image');
    expect(aboutImage.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
