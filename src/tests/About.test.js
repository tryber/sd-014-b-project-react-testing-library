import { render, screen } from '@testing-library/react';
import React from 'react';
import About from '../components/About';

describe('Teste se a página contém as informações sobre a Pokédex.', () => {
  it('A página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);

    const aboutPokedex = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });

    expect(aboutPokedex).toBeInTheDocument();
  });

  it('A página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(<About />);

    const paragra1 = screen.getByText(/This application simulates a Pokédex/);
    const paragra2 = screen.getByText(/One can filter Pokémons by type/);

    expect(paragra1).toBeInTheDocument();
    expect(paragra2).toBeInTheDocument();
  });

  it('A página contém a seguinte imagem de uma Pokédex:', () => {
    render(<About />);

    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
