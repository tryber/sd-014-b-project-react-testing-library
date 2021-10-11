import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente About', () => {
  it('Pagina contem um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const aboutPokedex = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(aboutPokedex).toBeDefined();
  });

  it('Pagina contem dois paragrafos sobre a Pokédex', () => {
    render(<About />);

    const paragOne = screen.getByText(/This application simulates a Pokédex,/i);
    expect(paragOne).toBeInTheDocument();

    const paragTwo = screen.getByText(/One can filter Pokémons by type/i);
    expect(paragTwo).toBeInTheDocument();
  });

  it('Pagina contem a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const imgPokedex = screen.getByRole('img');

    expect(imgPokedex).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
