import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testa o componente About.js', () => {
  it('deve conter um heading h2 com o texto "About Pokédex"', () => {
    render(<About />);
    const pageTitle = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(pageTitle).toBeInTheDocument();
  });

  it('deve conter dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const firstParagraph = screen.getByText(/this/i);
    const secondParagraph = screen.getByText(/one/i);

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  }); // https://testing-library.com/docs/queries/about/#textmatch

  it('deve conter a imagem específica de uma Pokédex', () => {
    render(<About />);
    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  }); // https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
});
