import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Teste do componente About', () => {
  it('Testa se existe o titulo About Pokedex no título', () => {
    renderWithRouter(<About />);

    const title = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(title).toBeInTheDocument();
  });

  it('Testa se existe dois paragrafos', () => {
    renderWithRouter(<About />);
    // usei a logica desse artigo https://testing-library.com/docs/queries/about/#priority
    const p1 = screen.getByText(/This application simulates a Pokédex/i);
    expect(p1).toBeInTheDocument();

    const p2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(p2).toBeInTheDocument();
  });

  it('Testa se existe uma imagem', () => {
    renderWithRouter(<About />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
