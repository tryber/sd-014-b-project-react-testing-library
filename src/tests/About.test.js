import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { About } from '../components';

describe('Testa o componente About', () => {
  test('se a página contém as informações sobre a Pokedex', () => {
    renderWithRouter(<About />);
    const titleAbout = screen.getByText(/About Pokédex/i);
    expect(titleAbout).toBeInTheDocument();
  });
  test('se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const titleAbout = screen.getByRole('heading',
      { name: 'About Pokédex' });
    expect(titleAbout).toBeInTheDocument();
  });
  test('se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragrafo1 = screen.getByText('This application simulates a Pokédex, '
    + 'a digital encyclopedia containing all Pokémons');
    const paragrafo2 = screen.getByText('One can filter Pokémons '
    + 'by type, and see more details for each one of them');
    expect(paragrafo1).toBeInTheDocument();
    expect(paragrafo2).toBeInTheDocument();
  });
  test('se a página contém uma imagem específica', () => {
    renderWithRouter(<About />);
    const imagemAbout = screen.getByRole('img');
    expect(imagemAbout.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
