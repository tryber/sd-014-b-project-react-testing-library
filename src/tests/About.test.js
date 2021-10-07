import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe(`2. Teste o componente <About.js />, 
se a página contém as informações sobre a Pokédex.`, () => {
  test('se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    const title = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(title).toBeInTheDocument();
  });

  /** Ref: https://testing-library.com/docs/queries/about/#textmatch sobre substrings no TextMatch */
  test('se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const p1 = screen.getByText(/This application simulates a Pokédex/);
    const p2 = screen.getByText(/One can filter Pokémons by type/);
    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  test('se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.', () => {
    renderWithRouter(<About />);
    const pokedexImg = screen.getByRole('img');
    expect(pokedexImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
