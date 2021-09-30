import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import { About } from '../components';

describe('2 - Testa o componente About.js', () => {
  test('Verifica se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const paragraphFirstInfo = screen.getByText(/This application simulates a Pokédex/i);
    expect(paragraphFirstInfo).toBeInTheDocument();

    const paragraphSecondInfo = screen.getByText(/One can filter Pokémons by type/i);
    expect(paragraphSecondInfo).toBeInTheDocument();
  });

  test('Verifica se a página contém um h2 com texto About Pokédex', () => {
    renderWithRouter(<About />);
    const elementHeading = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(elementHeading).toBeInTheDocument();
  });

  test('Verifica se a página contém 2 parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const textPokedexInfo = screen.getAllByText(/Pokédex/i);
    expect(textPokedexInfo).toHaveLength(2);
  });

  test(' Verifica se a página contém imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const elementImage = screen.getByRole('img');
    const imageUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(elementImage).toBeInTheDocument();
    expect(elementImage).toHaveAttribute('src', imageUrl);
  });
});
