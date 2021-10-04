import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../components/About';

describe('Teste o componente <About.js />', () => {
  test('Se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);

    const title = screen.getByText('About Pokédex');
    expect(title).toBeInTheDocument();
  });

  test('Se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);

    const h2 = screen.getByRole('heading', { name: 'About Pokédex', level: 2,
    });

    expect(h2).toBeInTheDocument();
  });

  test('Se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);

    const firstParagraph = screen.getByText(/This application simulates a Pokédex/);
    const secondParagraph = screen.getByText(/One can filter Pokémons by type/);

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  test('Se a página contém a imagem de uma Pokédex', () => {
    render(<About />);

    const imagem = screen.getByRole('img');
    expect(imagem).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(imagem).toHaveAttribute('alt', 'Pokédex');
  });
});
