import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('testando requisito 2, teste about', () => {
  test('Testa se existe um heading h2 com o texto About Pokedex', () => {
    render(<About />);

    const aboutPokedex = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex' });

    expect(aboutPokedex).toBeInTheDocument();
  });
  test('Testa se contem 2 paragrafos com o texto About Pokedex', () => {
    render(<About />);

    const firstParargaph = screen.getByText(/this/i);
    expect(firstParargaph).toBeInTheDocument();

    const secondParagraph = screen.getByText(/one/i);
    expect(secondParagraph).toBeInTheDocument();
  }); // https://testing-library.com/docs/queries/about/#textmatch
  test('Testa se contem a imagem especifica citada de uma pokedex', () => {
    render(<About />);

    const image = screen.getByRole('img');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  }); // pode usar .src para acessar a prorpiedade src do item
});
