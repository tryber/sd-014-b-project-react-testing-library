import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import { About } from '../components';

describe('Teste se a página contém as informações sobre a Pokédex.', () => {
  test('Se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const aboutTitle = screen.getByRole('heading',
      { name: 'About Pokédex', level: 2 });
    expect(aboutTitle).toBeInTheDocument();
  });
  test('Se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const p = screen.getByText(/This/i);
    const p2 = screen.getByText(/One/i);
    expect(p).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });
  test('Se a página contém a seguinte imagem de uma Pokédex:', () => {
    renderWithRouter(<About />);
    const displayedImage = screen.getByAltText('Pokédex');
    const srcImage = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(displayedImage.src).toContain(srcImage);
  });
});
