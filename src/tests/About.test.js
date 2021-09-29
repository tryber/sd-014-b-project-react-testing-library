import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testa o Componente "About"', () => {
  test('se o path é o "/about"', () => {
    const { history } = renderWithRouter(<About />);
    history.push('/about');
    const pathName = history.location.pathname;
    expect(pathName).toBe('/about');
  });

  test('se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    const h2 = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(h2).toBeInTheDocument();
  });

  test('se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const firstP = screen.getByText(/This application simulates a Pokédex/i);
    const secondP = screen.getByText(/One can filter Pokémons by type/i);
    expect(firstP).toBeInTheDocument();
    expect(secondP).toBeInTheDocument();
  });

  test('se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(img).toBeInTheDocument();
  });
});
