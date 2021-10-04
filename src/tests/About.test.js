import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';

import About from '../components/About';

describe('About.js testcase:', () => {
  test('Se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);

    const about = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(about).toBeInTheDocument();
  });

  test('Se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const about = screen.getAllByText(/Pokémons/i); // REFAC ?
    expect(about.length).toEqual(2);
  });

  test('se a página contém a seguinte imagem de uma Pokédex:', () => {
    renderWithRouter(<About />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
