import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from './renderWithRouter';

import { About } from '../components';

describe('Testa a funcionalidade do componente About', () => {
  it('verifica informações a respeito da Pokédex', () => {
    renderWithRouter(<About />);

    const aboutPokedex = screen.getByRole('heading', { level: 2 });
    expect(aboutPokedex).toBeInTheDocument();

    const infoP = screen.getByText(/This application simulates a Pokédex/i);
    expect(infoP).toBeInTheDocument();
  });

  it('verifica se a página contém um heading h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);

    const pokedex = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(pokedex).toBeInTheDocument();
  });

  it('verifica se a página contém 2 parágrafos de texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const firstP = screen.getByText(/This application simulates a Pokédex/i);
    expect(firstP).toBeInTheDocument();

    const secondP = screen.getByText(/One can filter Pokémons by type, and see/i);
    expect(secondP).toBeInTheDocument();
  });

  it('verifica a imagem da Pokédex', () => {
    renderWithRouter(<About />);

    const pokedex = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imgPokedex = screen.getByRole('img', { name: 'Pokédex' });
    expect(imgPokedex.src).toContain(pokedex);
  });
});
