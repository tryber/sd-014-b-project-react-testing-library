import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import About from '../components/About';

describe('Req 2 - Testa o componente "<About.js />', () => {
  it('Deve renderizar um heading h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);

    const aboutPokedex = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(aboutPokedex).toBeInTheDocument();
  });

  it('Deve renderizar dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />)

    const paragraphs = screen.getAllByText(/pokémons/i);
    expect(paragraphs.length).toBe(2);
  });

  it('Deve renderizar a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const imagePokedex = screen.getByRole('img');
    expect(imagePokedex).toBeInTheDocument();
    expect(imagePokedex).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
