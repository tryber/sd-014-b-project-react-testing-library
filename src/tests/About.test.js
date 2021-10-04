import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Testes do compo About', () => {
  it('A página deve conter um h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);
    const aboutHeading = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(aboutHeading).toBeInTheDocument();
  });
  it('A página deve conter a imagem de uma pokédex', () => {
    renderWithRouter(<About />);
    const pokedexImg = screen.getByRole('img');
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(pokedexImg).toHaveAttribute('src', url);
  });
  it('A página deve conter dois paragrafos com informações da pokédex', () => {
    renderWithRouter(<About />);
    const paragraphP1 = 'This application simulates a Pokédex, ';
    const paragraphP2 = 'a digital encyclopedia containing all Pokémons';
    const paragraph1 = paragraphP1 + paragraphP2;
    const info = screen.getByText(paragraph1);
    expect(info).toBeInTheDocument();

    const paragraph2P1 = 'One can filter Pokémons by type, ';
    const paragraph2P2 = 'and see more details for each one of them';
    const paragraph2 = paragraph2P1 + paragraph2P2;
    const info2 = screen.getByText(paragraph2);
    expect(info2).toBeInTheDocument();
  });
});
