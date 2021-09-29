import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente About', () => {
  it('deveria apresentar o texto `About Pokédex` no título', () => {
    renderWithRouter(<About />);
    const title = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(title).toBeInTheDocument();
  });

  it('deveria ter 2 parágrafos', () => {
    renderWithRouter(<About />);
    const paragraph = screen.getAllByText(/Pokémons/);
    /*
    ** utilizando text matcher substring pois aparentemente a tag <p> não tem ARIA Role
    ** peguei uma palavra em comum entre os parágrafos, embora não esteja satisfeito com essa solução
    ** consultado por aqui: https://www.w3.org/TR/html-aria/#docconformance
    */
    expect(paragraph.length).toBe(2);
  });

  it('deveria apresentar o texto `About Pokédex` no título', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
