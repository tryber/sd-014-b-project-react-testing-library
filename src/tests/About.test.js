import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testando o componente About e suas respectivas funcionalidades', () => {
  it('Testando se existe um h2 com o nome "About Pokédex"', () => {
    renderWithRouter(<About />);

    const header = document.querySelector('h2');
    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe('About Pokédex');
  });
  it('Testando se existem dois paragrafos com textos sobre a pokedex', () => {
    renderWithRouter(<About />);

    const paragrafos = document.querySelectorAll('p');
    expect(paragrafos).toHaveLength(2);
    expect(paragrafos[1].textContent)
      .toBe('One can filter Pokémons by type, and see more details for each one of them');
  });
  it('Testando se a foto tem o src especificado', () => {
    renderWithRouter(<About />);

    const img = document.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', expect
      .stringContaining('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png'));
  });
});
