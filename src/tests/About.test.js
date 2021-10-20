import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import About from '../components/About';
import renderWithRouter from '../services/renderWithRouter';

describe('Requisito 2: Teste o componente <About.js />', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {});

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const about = screen.getByText('About Pokédex');
    expect(about).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const text1 = /This application simulates a Pokédex/i;
    const text2 = /One can filter Pokémons by type/i;
    const textPokedex1 = screen
      .getByText(text1);
    const textPokedex2 = screen
      .getByText(text2);
    expect(textPokedex1).toBeInTheDocument();
    expect(textPokedex2).toBeInTheDocument();
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const pokeImg = screen.getByRole('img');
    expect(pokeImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86'
+ '/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
