import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente About', () => {
  test('a pagina deve conter um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const pageTitle = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(pageTitle).toBeInTheDocument();
  });

  test('a pagina deve conter dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const pElement = screen.getByText(
      'This application simulates a Pokédex, '
      + 'a digital encyclopedia containing all Pokémons',
    );
    expect(pElement).toBeInTheDocument();

    const pElement2 = screen.getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );
    expect(pElement2).toBeInTheDocument();
  });

  test('a página deve conter imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const img = screen.getByAltText('Pokédex');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
