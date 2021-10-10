import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../components/renderWithRouter';

describe('Requisito 2 - Testa o componente <About.js />', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });

  test('Verifica se a página contem um header "h2" com o texto "About Pokédex"', () => {
    const aboutPokedex = screen.getByRole('heading', {
      level: 2,
    });
    expect(aboutPokedex.innerHTML).toStrictEqual('About Pokédex');
  });

  test('Verifica se a página contém dois parágrafos com o texto sobre a Pokédex', () => {
    const paragraph = screen.getAllByText(/Pokémons/);
    expect(paragraph).toHaveLength(2);
  });

  test('Testa se a página contém a imagem da Pokédex', () => {
    const source = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const image = screen.getByRole('img', { name: 'Pokédex' });
    expect(image).toBeInTheDocument();
    expect(image.src).toStrictEqual(source);
  });
});
