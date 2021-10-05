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

    const para1 = screen.getByText(/This application simulates a Pokédex, a digital/i);
    const para2 = screen.getByText(/One can filter Pokémons by type, and see more/i);
    // i é um text match que analisa se o texto contém o trecho desejado

    expect(para1).toBeInTheDocument();
    expect(para2).toBeInTheDocument();
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

// https://testing-library.com/docs/queries/about/#textmatch

// screen#
// All of the queries exported by DOM Testing Library accept a container as the first argument.
// Because querying the entire document.body is very common, DOM Testing Library also exports
//  a screen object which has every query that is pre-bound to document.body (using the within functionality).
//  Wrappers such as React Testing Library re-export screen so you can use it the same way.

// é preciso aplicar renderWithRouter para funcionar, o porque eu nao sei.
