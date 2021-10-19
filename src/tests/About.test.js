import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Página about', () => {
  it('Testa se a página contém as informações sobre a Pokédex', () => {
    render(<About />);
    const aboutPokedex = screen.getByTestId('about-pokedex');
    expect(aboutPokedex).toBeInTheDocument();
  });

  it('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const aboutTextAbout = screen.getByTestId('about-text-about');
    expect(aboutTextAbout).toHaveTextContent('About Pokédex');
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const aboutParagraph = screen.getAllByTestId('"about-paragraph"');
    expect(aboutParagraph).toHaveLength(2);
  });

  it('Testa se a página contém a imagem de uma Pokédex', () => {
    render(<About />);
    const aboutImagePokedex = screen.getByTestId('about-image-pokedex');
    expect(aboutImagePokedex.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
