import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../components';
import renderWithRouter from '../components/renderWithRouter';

describe('Requisito 02', () => {
  it('A página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.textContent).toBe('About Pokédex');
  });
  it('A página contém uma imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
  it('A página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragraph1 = screen.getByText('This application simulates a Pokédex,'
    + ' a digital encyclopedia containing all Pokémons');
    const paragraph2 = screen.getByText('One can filter Pokémons by type,'
    + ' and see more details for each one of them');
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });
});
