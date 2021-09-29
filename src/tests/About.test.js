import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import { About } from '../components';

describe('Requisito 2 - Testa <About.js />', () => {
  test('A página tem informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const pokedexInfo = screen.getByText(/This application simulates/i);
    expect(pokedexInfo).toBeInTheDocument();
  });

  test('A página tem a heading h2 com o texto: About Pokédex', () => {
    renderWithRouter(<About />);
    // Procura uma tag pelo seu papel (role)
    const heading = screen.getByRole(
      // heading level 2 = <h2></h2>
      'heading', {
        level: 2,
        name: 'About Pokédex',
      },
    );
    expect(heading).toBeInTheDocument();
  });

  test('A página tem 2 parágrafos sobre a Pokédex', () => {
    renderWithRouter(<About />);
    // Procura na tela os parágrafos
    const paragraph1 = screen.getByText(/This/i);
    const paragraph2 = screen.getByText(/One/i);
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  test('A página exibe a imagem de uma pokédex', () => {
    renderWithRouter(<About />);
    const imgTag = screen.getByRole('img');
    expect(imgTag).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
