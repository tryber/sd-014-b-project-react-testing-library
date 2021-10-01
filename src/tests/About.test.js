import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { About } from '../components';

describe('Requisito 2', () => {
  it('A página contém as informações sobre a Pokédex?', () => {
    renderWithRouter(<About />);
    const info = screen.getAllByText(/Pokémons/);
    // console.log('oi', info);
    expect(info).toHaveLength(2);
    // testing-library.com/docs/react-testing-library/cheatsheet/
  });
  it('A página contém um heading h2 com o texto "About Pokédex"? ', () => {
    renderWithRouter(<About />);
    const h2 = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(h2).toBeInTheDocument();
  });
  it('A pagina contém a seguinte imagem?', () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img');
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(img.src).toBe(src);
  });
});
// o primeiro teste também vale para os paragrafos, como? pelos nós filhos
