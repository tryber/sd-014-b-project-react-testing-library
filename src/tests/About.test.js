import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente about', () => {
  test('se a pagina tem contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const headerText = screen.getByRole('heading', { level: 2 });
    expect(headerText).toBeInTheDocument();
    expect(headerText).toHaveTextContent('About Pokédex');
  });

  test('se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragraph1 = screen.getByText(/This application simulates a Pokédex/);
    expect(paragraph1).toBeInTheDocument();
    const paragraph2 = screen.getByText(/One can filter Pokémons by type/);
    expect(paragraph2).toBeInTheDocument();
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img)
      .toHaveAttribute(
        'src',
        'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
      );
  });
});
