import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

describe('Testa o componente About', () => {
  test('se a página contém as informações sobre a Pokédex. ', () => {
    render(<About />);
    const text = /This application simulates a Pokédex/;
    const infoPokedex = screen.getByText(text);

    expect(infoPokedex).toBeInTheDocument();
  });

  test('Se  a página contém um heading h2 com o texto About Pokédex ', () => {
    render(<About />);

    const infoPokedex = screen.getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });

    expect(infoPokedex).toBeInTheDocument();
  });

  test('se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(<About />);
    const text = /This application simulates a Pokédex/;
    const infoPokedex = screen.getByText(text);
    const infoText2 = screen.getByText(/One can filter Pokémons by type/);

    expect(infoPokedex).toBeInTheDocument();
    expect(infoText2).toBeInTheDocument();
  });

  test('se a página contém a seguinte imagem de uma Pokédex', () => {
    render(<About />);
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img');

    expect(img.getAttribute('src')).toEqual(url);
  });
});
