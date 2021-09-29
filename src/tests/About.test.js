import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Testa o conteúdo da página About', () => {
  test('se o título existe', () => {
    renderWithRouter(<About />);
    const titleAbout = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(titleAbout).toBeInTheDocument();
  });

  test('se a quantidade de parágrafos é igual a 2', () => {
    renderWithRouter(<About />);

    // Uso do TextMatch falado na documentação na linha 16. Colocar Pokémons entre barras faz a verificação da existência da substring passada.

    const quantityParagraphs = screen.getAllByText(/Pokémons/);
    expect(quantityParagraphs.length).toBe(2);
  });

  test('se a imagem correta é renderizada', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
