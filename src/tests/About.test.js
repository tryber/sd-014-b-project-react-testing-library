import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../components';
import renderWithRouter from './RenderWithRouter';

describe('Testa o segundo requisito', () => {
  test('Verifica se a página contém um heading h2 com o texto About Pokedex', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(heading).toBeInTheDocument();
  });

  test('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const firstParagraph = screen.getByText(/This application simulates a Pokédex/);
    expect(firstParagraph).toBeInTheDocument();

    const secondParagraph = screen.getByText(/One can filter Pokémons by type/);
    expect(secondParagraph).toBeInTheDocument();
  });

  test('Verifica se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
