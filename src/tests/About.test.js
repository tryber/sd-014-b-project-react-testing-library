import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testa se o componente About.js', () => {
  test('se a página contém um heading h2 com o text About Pokédex', () => {
    renderWithRouter(<About />);
    const aboutTitle = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(aboutTitle).toBeInTheDocument();
  });

  test('se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const firstParagrapher = screen.getByText(/This/i);
    const secondParagrapher = screen.getByText(/One/i);

    expect(firstParagrapher).toBeInTheDocument();
    expect(secondParagrapher).toBeInTheDocument();
  });

  test('se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const img = screen.getByRole('img');

    expect(img).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
