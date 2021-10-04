import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import App from '../App';

describe('Testa o componente About.js', () => {
  test('se a página contém um heading h2 com o texto "About Pokédex".', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);

    const pokedexHeading = screen.getByRole('heading',
      { level: 2, name: 'About Pokédex' });

    expect(pokedexHeading).toBeInTheDocument();
  });

  test('se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);

    const paragraph1 = screen.getByText(/This application simulates/i);
    const paragraph2 = screen.getByText(/One can filter Pokémons/i);

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  test('se a página contém a imagem de uma Pokédex.', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);

    const pokedexImage = screen
      .getByAltText('Pokédex');

    expect(pokedexImage).toBeInTheDocument();
    expect(pokedexImage).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
