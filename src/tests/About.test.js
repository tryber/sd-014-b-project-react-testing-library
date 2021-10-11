import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('se a página contém as informações sobre a Pokédex', () => {
  it('deveria exibir um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const titleText = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(titleText).toBeInTheDocument();
  });
  it('deveria exibir dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const firstParagraph = screen.getByText(/This application simulates/i);
    const secondParagraph = screen.getByText(/One can filter Pokémons/i);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });
  it('deveria exibir a seguinte imagem de uma Pokédex', () => {
    render(<About />);
    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
