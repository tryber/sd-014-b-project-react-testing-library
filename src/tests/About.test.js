import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testa o componente <About.js />', () => {
  it('Testa se o componente é renderizado', () => {
    render(<About />);
  });

  it('Testa se a página contém um heading h2 com o texto About Pokédex.', () => {
    render(<About />);
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent('About Pokédex');
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(<About />);
    const paragraphs = screen.getAllByText(/Pokémons/);
    expect(paragraphs.length).toBe(2);
  });

  it('Testa se a página contém a seguinte imagem de uma Pokédex', () => {
    render(<About />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
