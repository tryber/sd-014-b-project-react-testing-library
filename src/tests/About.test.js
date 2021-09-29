import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { About } from '../components';
import renderWithRouter from './utils/renderWithRouter';

describe('Teste o componente <About.js />.', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const pokedexContent = screen.getByText(/This application/i);
    expect(pokedexContent).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const headingContent = screen.getByText(/About Pokédex/i);
    expect(headingContent).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.',
    () => {
      renderWithRouter(<About />);

      const firstContent = screen.getByText(/This/i);
      const secondContet = screen.getByText(/One/i);

      expect(firstContent).toBeInTheDocument();
      expect(secondContet).toBeInTheDocument();
    });
  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const imgContent = screen.getByRole('img');
    expect(imgContent).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
