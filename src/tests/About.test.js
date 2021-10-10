import React from 'react';
import { screen } from '@testing-library/react';
import RenderWithRouter from '../RenderWithRouter';
import About from '../components/About';

describe('Teste se a página contém as informações sobre a Pokédex.', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    RenderWithRouter(<About />);
    const aboutHeading = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(aboutHeading).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    RenderWithRouter(<About />);
    expect(screen.getByText(/This/i)).toBeInTheDocument();
    expect(screen.getByText(/One/i)).toBeInTheDocument();
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    RenderWithRouter(<About />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
