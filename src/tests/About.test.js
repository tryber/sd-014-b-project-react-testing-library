import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import { About } from '../components';

describe('Teste o componente About.js', () => {
  it('Verifica se a página contém informações sobre a Pokedex', () => {
    renderWithRouter(<About />);
    const pokedexInfo = screen.getByText('This application simulates a Pokédex,'
    + ' a digital encyclopedia containing all Pokémons');
    expect(pokedexInfo).toBeInTheDocument();
  });

  it('Verifica se a página contém um "h2" com About Pokédex', () => {
    renderWithRouter(<About />);
    const h2About = screen.getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });
    expect(h2About).toBeInTheDocument();
  });

  it('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const aboutParagraph1 = screen.getByText('This application simulates a Pokédex,'
    + ' a digital encyclopedia containing all Pokémons');
    const aboutParagraph2 = screen.getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );
    expect(aboutParagraph1).toBeInTheDocument();
    expect(aboutParagraph2).toBeInTheDocument();
  });

  it('Verifica se contém a imagem correta', () => {
    renderWithRouter(<About />);
    const aboutImage = screen.getByRole('img');
    expect(aboutImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload'
    + '/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
