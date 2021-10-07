import React from 'react';
import { render, screen } from '@testing-library/react';

import About from '../components/About';

describe('Testa o componente <About.js />', () => {
  it('Deveria conter as informações sobre a Pokédex', () => {
    render(<About />);
  });

  it('Deveria conter na pagina um heading h2 com o texto "About Pokédex"', () => {
    render(<About />);

    const subtitle = screen.getByRole('heading', { level: 2 });
    expect(subtitle).toHaveTextContent('About Pokédex');
  });

  it('Deveria conter na página dois parágrafos com textos sobre a Pokédex', () => {
    render(<About />);

    const texts = [
      'This application simulates a Pokédex, a digital encyclopedia'
      + ' containing all Pokémons',
      'One can filter Pokémons by type, and see more details for each one of them',
    ];

    // ref: https://testing-library.com/docs/queries/bytext/
    const paragraphs = screen.getAllByText(/Pokémons/);

    expect(screen.getByText(texts[0])).toBeInTheDocument();
    expect(screen.getByText(texts[1])).toBeInTheDocument();
    expect(paragraphs.length).toBe(2);
  });

  it('Deveria conter na página uma imagem de uma Pokédex', () => {
    render(<About />);

    const image = screen.getByRole('img');

    expect(image).toBeInTheDocument();

    // ref: https://github.com/testing-library/jest-dom#tohaveattribute
    expect(image).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
