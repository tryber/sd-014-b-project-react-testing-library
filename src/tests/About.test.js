import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testa o conteúdo da página About', () => {
  it('Verifica se o título existe', () => {
    renderWithRouter(<About />);
    const title = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(title).toBeInTheDocument();
  });

  it('Verifica se a quantidade de parágrafos é igual a 2', () => {
    renderWithRouter(<About />);
    const paragraphs = screen.getAllByText(/Pokémons/);
    expect(paragraphs.length).toBe(2);
  });

  it('Verifica se a imagem correta é renderizada', () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
