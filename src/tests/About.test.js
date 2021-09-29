import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Teste 2 - About.js', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />, '/about');
    const aboutText = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(aboutText).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />, '/about');
    const paragraphOne = screen.getByText(
      /This application simulates a Pokédex/,
    );
    expect(paragraphOne).toBeInTheDocument();
    const paragraphTwo = screen.getByText(
      /One can filter Pokémons by type/i,
    );
    expect(paragraphTwo).toBeInTheDocument();
  });
  // Com a adocicada ajuda do StackOverflow
  // https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
  it('Teste se a página contém uma imagem especifica de uma Pokédex', () => {
    renderWithRouter(<About />, '/about');
    const image = screen.getByAltText('Pokédex');
    expect(image).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
