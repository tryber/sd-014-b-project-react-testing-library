import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { About } from '../components';

describe('Teste o componente <About.js />', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const aboutTitle = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(aboutTitle).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex ', () => {
    renderWithRouter(<About />);
    const aboutInfoOne = screen.getByText('This application simulates a Pokédex,'
    + ' a digital encyclopedia containing all Pokémons');
    expect(aboutInfoOne).toBeInTheDocument();
    const aboutInfoTwo = screen.getByText('One can filter Pokémons by type,'
    + ' and see more details for each one of them');
    expect(aboutInfoTwo).toBeInTheDocument();
  });

  test('Teste se a página contém a imagem correta de uma Pokédex', () => {
    renderWithRouter(<About />);
    const srcImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const aboutImg = screen.getByRole('img');
    expect(aboutImg).toBeInTheDocument();
    expect(aboutImg).toHaveAttribute('src', srcImg);
  });
});
