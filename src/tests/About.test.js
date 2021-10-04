import { screen } from '@testing-library/react';
import React from 'react';
import renderWithRouter from './RenderWithRouter';
import About from '../components/About';

describe('Testa o componente About', () => {
  test('Se a página contém um heading h2 com o texto `About Pokédex`', () => {
    renderWithRouter(<About />);

    const h2 = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });

    expect(h2).toBeInTheDocument();
  });

  test('Se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const p1 = screen.getByText(/This application simulates a Pokédex/);

    const p2 = screen.getByText(/One can filter Pokémons by type/);

    expect(p1).toBeInTheDocument();

    expect(p2).toBeInTheDocument();
  });

  test('Se a página contém a imagem de uma pokédex', () => {
    renderWithRouter(<About />);

    const imgPokedex = screen.getByRole('img');

    expect(imgPokedex).toBeInTheDocument();
    expect(imgPokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
